import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

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
    const help_datas = { student_id, question };

    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(help_datas))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.findOne({
      where: {
        id: student_id,
      },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student does not found' });
    }

    if (!student.registration_id) {
      return res.status(401).json({ error: 'Student does not registrated' });
    }

    const help = await HelpOrder.create({ student_id, question });
    return res.json(help);
  }
}

export default new HelpOrderController();
