import Sequelize, { Model } from 'sequelize';
import { addMonths, parseISO } from 'date-fns';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        plan_id: Sequelize.INTEGER,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.DOUBLE,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.GymPlan, { foreignKey: 'plan_id', as: 'gym_plan' });
  }

  setPrice({ price, duration }) {
    this.price = duration * price;
  }

  setEndDate(start_date, { duration }) {
    this.end_date = addMonths(parseISO(start_date), duration);
  }
}

export default Registration;
