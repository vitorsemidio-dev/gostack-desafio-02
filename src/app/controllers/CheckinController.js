import { startOfDay, endOfDay, subDays } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { id: student_id } = req.params;
    const checkins = await Checkin.findAll({ where: { student_id } });

    return res.json(checkins);
  }

  async create(req, res) {
    const { id: student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(404).json({ error: 'Student does not found' });
    }

    const today = new Date();

    const checkins = await Checkin.findAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [startOfDay(subDays(today, 7)), endOfDay(today)],
        },
      },
    });

    if (checkins.length >= 5) {
      return res.status(401).json({
        error: "You've already made 5 checkin in the last seven days",
      });
    }

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }
}

export default new CheckinController();
