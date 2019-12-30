import * as Yup from 'yup';
import Registration from '../models/Registration';

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
    const registration = await Registration.create(req.body);
    return res.json(registration);
  }
}

export default new RegistrationController();
