import HelpOrder from '../models/HelpOrder';

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

    await help.update({ answer, answer_at: new Date() });
    return res.json({ help_id, answer, help });
  }
}

export default new AnswerController();
