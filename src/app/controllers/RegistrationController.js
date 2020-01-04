import * as Yup from 'yup';
import { addMonths, isBefore, parseISO, startOfDay, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Registration from '../models/Registration';
import Student from '../models/Student';
import GymPlan from '../models/GymPlan';

import Notification from '../schemas/Notification';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async index(req, res) {
    const { page } = req.query;
    const initialPage = !page || page < 1 ? 1 : page;
    const registrations = await Registration.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      limit: 20,
      offset: (initialPage - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: GymPlan,
          as: 'gym_plan',
          attributes: ['id', 'title'],
        },
      ],
    });
    return res.json(registrations);
  }

  async show(req, res) {
    const registration = await Registration.findByPk(req.params.regId, {
      include: [
        {
          model: GymPlan,
          as: 'gym_plan',
        },
      ],
    });

    if (!registration) {
      return res.status(404).json({ error: 'Registration does not found' });
    }
    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date().when('plan_id', (plan_id, field) =>
        !plan_id ? field.required() : field
      ),
      end_date: Yup.date(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Check if registration exists
     */
    const registration = await Registration.findByPk(req.params.regId, {
      include: [
        {
          model: GymPlan,
          as: 'gym_plan',
          attributes: ['price', 'duration'],
        },
      ],
    });

    if (!registration) {
      return res.status(404).json({ error: 'Registration does not found' });
    }

    /**
     * Check if student exists
     */
    const { student_id } = registration;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(404).json({ error: 'Student does not found' });
    }

    /**
     * Check if registration has already started
     */
    const { plan_id, start_date } = req.body;
    const alreadyStart = isBefore(
      startOfDay(registration.start_date),
      new Date()
    );

    if (plan_id && alreadyStart && !start_date) {
      return res.status(400).json({
        error:
          'New start_date is required to update registration that has already started',
      });
    }

    /**
     * Check if plan exists
     */
    const plan = await GymPlan.findByPk(plan_id);

    if (plan_id && !plan) {
      return res.status(404).json({ error: 'Plan does not found' });
    }

    /**
     * Validation start_date
     */
    if (start_date && isBefore(parseISO(start_date), new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    /**
     * Save changes in DB
     */
    if (plan) {
      registration.set({ plan_id, gym_plan: plan });
      registration.setPrice(plan);
    }

    const { gym_plan } = registration;

    if (start_date) {
      const plan_data = plan || gym_plan;
      registration.setEndDate(start_date, plan_data);
    }

    await registration.save();

    return res.json(registration);
  }

  async delete(req, res) {
    const { regId: id } = req.params;
    await Registration.destroy({
      where: { id },
    });
    return res.status(200).json();
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
      end_date: Yup.date(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(404).json({ error: 'Student does not found' });
    }

    if (student.registration_id) {
      return res.status(401).json({ error: 'Student already registrated' });
    }

    const plan = await GymPlan.findByPk(plan_id);

    if (!plan) {
      return res.status(404).json({ error: 'Plan does not exists' });
    }

    const { price: cost, duration } = plan;

    const price = cost * duration;
    const end_date = addMonths(new Date(start_date), duration);

    const registro = { student_id, plan_id, start_date, end_date, price };
    const registration = await Registration.create(registro);
    const { id: registration_id } = registration;

    await student.update({ registration_id });

    const formattedDate = format(
      parseISO(start_date),
      "'dia' dd 'de' MMMM 'de' yyyy",
      {
        locale: pt,
      }
    );

    await Notification.create({
      content: `Nova Matrícula de ${student.name}. O treinamento começará no ${formattedDate}`,
      student: student_id,
    });

    Queue.add(RegistrationMail.key, {
      name: student.name,
      formattedDate,
      plan: plan.title,
      total_price: registration.price,
      email: student.email,
    });

    return res.json(registration);
  }
}

export default new RegistrationController();
