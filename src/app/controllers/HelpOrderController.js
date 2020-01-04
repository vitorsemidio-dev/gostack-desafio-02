import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async index(req, res) {
    const { student_id } = req.params;
    const helpOrders = await HelpOrder.findAll({
      where: { student_id },
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const { student_id } = req.params;
    const { question } = req.body;

    const help = await HelpOrder.create({ student_id, question });
    return res.json(help);
  }
}

export default new HelpOrderController();
