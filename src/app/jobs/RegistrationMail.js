import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { name, email, title, price, formattedDate } = data;
    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Matrícula Realizada na GymPoint',
      template: 'registration',
      context: {
        student: name,
        plan: title,
        total_price: price,
        start_date: formattedDate,
      },
    });
  }
}

export default new RegistrationMail();
