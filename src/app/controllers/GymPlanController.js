import GymPlan from '../models/GymPlan';

class GymPlanController {
  async index(req, res) {
    const plans = await GymPlan.findAll();
    return res.json(plans);
  }

  async show(req, res) {
    const { planId } = req.params;
    const plan = await GymPlan.findByPk(planId);
    if (!plan) {
      return res.status(404).json({ error: 'Plan does not found' });
    }
    return res.json(plan);
  }

  async update(req, res) {
    const { planId } = req.params;
    const plan = await GymPlan.findByPk(planId);
    if (!plan) {
      return res.status(404).json({ error: 'Plan does not found' });
    }

    const planUpdated = await plan.update(req.body);
    return res.json(planUpdated);
  }

  async delete(req, res) {
    const { planId: id } = req.params;
    await GymPlan.destroy({ where: { id } });
    return res.status(200).json();
  }

  async store(req, res) {
    const plan = await GymPlan.create(req.body);
    return res.json(plan);
  }
}

export default new GymPlanController();
