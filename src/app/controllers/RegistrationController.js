import Registration from '../models/Registration';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll();
    return res.json(registrations);
  }

  async show(req, res) {
    const { regId } = req.params;
    return res.json(regId);
  }

  async update(req, res) {
    const { regId } = req.params;
    const { body } = req;
    return res.json({ regId, body });
  }

  async delete(req, res) {
    const { regId } = req.params;
    return res.json(regId);
  }

  async store(req, res) {
    const { body } = req;
    return res.json(body);
  }
}

export default new RegistrationController();
