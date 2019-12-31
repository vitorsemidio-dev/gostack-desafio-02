import * as Yup from 'yup';
import { addMonths } from 'date-fns';

import Registration from '../models/Registration';
import Student from '../models/Student';
import GymPlan from '../models/GymPlan';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll();
    return res.json(registrations);
  }

  async show(req, res) {
    const registration = await Registration.findByPk(req.params.regId);

    if (!registration) {
      return res.status(404).json({ error: 'Registration does not found' });
    }
    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
      end_date: Yup.date(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const registration = await Registration.findByPk(req.params.regId);

    if (!registration) {
      return res.status(404).json({ error: 'Registration does not found' });
    }

    const registrationUpdated = await registration.update(req.body);
    return res.json(registrationUpdated);
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

    const plan = await GymPlan.findByPk(plan_id);

    if (!plan) {
      return res.status(404).json({ error: 'Plan does not exists' });
    }

    const { price: cost, duration } = plan;

    const price = cost * duration;
    const end_date = addMonths(new Date(start_date), duration);

    const registro = { student_id, plan_id, start_date, end_date, price };

    await Promise.all([
      Registration.create(registro),
      student.update({ plan_id }),
    ]);
    return res.json(registro);
  }
}

export default new RegistrationController();
