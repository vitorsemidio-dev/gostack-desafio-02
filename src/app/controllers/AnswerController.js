import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class AnswerController {
  async store(req, res) {
    const { help_id } = req.params;
    const { answer } = req.body;
    const answer_data = { help_id, answer };

    const schema = Yup.object().shape({
      help_id: Yup.number().required(),
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(answer_data))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const help = await HelpOrder.findByPk(help_id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!help) {
      return res.status(404).json({ error: 'Help does not found' });
    }

    const { question } = help;
    const { name: student_name, email: student_email } = help.student;

    Queue.add(AnswerMail.key, {
      student_name,
      student_email,
      question,
      answer,
    });

    await help.update({ answer, answer_at: new Date() });
    return res.json(help);
  }
}

export default new AnswerController();
