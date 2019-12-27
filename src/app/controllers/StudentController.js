import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const { name, email, age, weight, height } = req.body;
    const { id } = req.params;

    console.log(name, email, id);

    // return res.json({ name, email, id });

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: 'Student does not found' });
    }

    if (email && email !== student.email) {
      const userExist = await Student.findOne({ where: { email } });
      if (userExist) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    student.email = email || student.email;
    student.name = name || student.name;
    student.age = age || student.age;
    student.weight = weight || student.weight;
    student.height = height || student.height;

    console.log(student);

    // const student = await Student.create(req.body);

    return res.json(student);
  }
}

export default new StudentController();
