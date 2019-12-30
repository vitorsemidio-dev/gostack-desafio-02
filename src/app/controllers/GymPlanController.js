import GymPlan from '../models/GymPlan';

class GymPlanController {
  async index(req, res) {
    const plans = await GymPlan.findAll();
    return res.json(plans);
  }

  async show(req, res) {
    const { planId } = req.params;
    return res.json(planId);
  }

  async update(req, res) {
    const { planId } = req.params;
    const { body: plan } = req;
    return res.json({ planId, plan });
  }

  async delete(req, res) {
    const { planId } = req.params;
    return res.json(planId);
  }

  async store(req, res) {
    const { body: plan } = req;
    return res.json(plan);
  }
}

export default new GymPlanController();
