import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const { name, email, age, weight, height } = req.body;
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: 'Student does not found' });
    }

    if (email && email !== student.email) {
      const emailExists = await Student.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    let studentUpdated = { email, name, age, weight, height };

    studentUpdated.email = email || student.email;
    studentUpdated.name = name || student.name;
    studentUpdated.age = age || student.age;
    studentUpdated.weight = weight || student.weight;
    studentUpdated.height = height || student.height;

    studentUpdated = await student.update(studentUpdated);

    return res.json(studentUpdated);
  }
}

export default new StudentController();
