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

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }
}

export default new CheckinController();
