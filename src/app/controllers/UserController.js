import User from '../models/User';

class UserController {
  async store(req, res) {
    const admin = await User.create(req.body);

    return res.json(admin);
  }
}

export default new UserController();
