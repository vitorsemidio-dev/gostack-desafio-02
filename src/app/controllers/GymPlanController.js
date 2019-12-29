import GymPlan from '../models/GymPlan';

class GymPlanController {
  async index(req, res) {
    return res.json({ gym: 'plan' });
  }

  async show(req, res) {
    return res.json({ gym: 'plan' });
  }

  async update(req, res) {
    return res.json({ gym: 'plan' });
  }

  async delete(req, res) {
    return res.json({ gym: 'plan' });
  }

  async store(req, res) {
    return res.json({ gym: 'plan' });
  }
}

export default new GymPlanController();
