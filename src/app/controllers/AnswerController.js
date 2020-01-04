import HelpOrder from '../models/HelpOrder';

import AnswerMail from '../jobs/AnswerMail';
import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class AnswerController {
  async index(req, res) {
    return res.json({ answerGet: true });
  }

  async store(req, res) {
    const { help_id } = req.params;
    const { answer } = req.body;

    const help = await HelpOrder.findByPk(help_id);

    if (!help) {
      return res.status(404).json({ error: 'Help does not found' });
    }

    // Queue.add(RegistrationMail.key, {
    //   name: 'student.name',
    //   formattedDate: 'formattedDate',
    //   plan: 'plan.title',
    //   total_price: 'registration.price',
    //   email: 'student.email',
    //   // student_name: 'student_name',
    //   // student_email: 'student_email',
    //   // question: 'question',
    //   // answer: 'answer',
    // });
    Queue.add(AnswerMail.key, {
      student_name: 'student_name',
      student_email: 'student_email',
      question: 'question',
      answer: 'answer',
    });

    await help.update({ answer, answer_at: new Date() });
    return res.json({ help_id, answer, help });
  }
}

export default new AnswerController();
