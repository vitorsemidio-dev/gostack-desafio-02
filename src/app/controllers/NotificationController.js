import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const notifications = await Notification.find()
      .sort({ createAt: -1 })
      .limit(20);
    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.notifId,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
