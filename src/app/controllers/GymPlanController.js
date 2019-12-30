import * as Yup from 'yup';

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
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
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
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const plan = await GymPlan.create(req.body);
    return res.json(plan);
  }
}

export default new GymPlanController();
