import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const notifications = await Notification.find()
      .sort({ createAt: -1 })
      .limit(20);
    return res.json(notifications);
  }
}

export default new NotificationController();
