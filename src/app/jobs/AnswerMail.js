// import Mail from '../../lib/Mail';

// class AnswerMail {
//   get key() {
//     return 'AnswerMail';
//   }

//   async handle({ data }) {
//     const { question, answer, student_name, student_email } = data;
//     await Mail.sendMail({
//       to: `${student_name} <${student_email}>`,
//       subject: 'Pergunta Respondida',
//       template: 'help',
//       context: {
//         question,
//         answer,
//         student_name,
//       },
//     });
//   }
// }

// export default new AnswerMail();

import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { name, email, title, price, formattedDate } = data;
    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Matrícula Realizada na GymPoint',
      template: 'help',
      context: {
        student: name,
        plan: title,
        total_price: price,
        start_date: formattedDate,
      },
    });
  }
}

export default new AnswerMail();
