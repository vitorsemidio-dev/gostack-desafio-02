class AnswerController {
  async index(req, res) {
    return res.json({ answerGet: true });
  }

  async store(req, res) {
    return res.json({ answerPost: true });
  }
}

export default new AnswerController();
