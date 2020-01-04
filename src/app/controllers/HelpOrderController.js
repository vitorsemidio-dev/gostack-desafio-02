class HelpOrderController {
  async index(req, res) {
    return res.json({ helpGet: true });
  }

  async store(req, res) {
    return res.json({ helpPost: true });
  }
}

export default new HelpOrderController();
