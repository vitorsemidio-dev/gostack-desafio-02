import Sequelize, { Model } from 'sequelize';

class GymPlan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        price: Sequelize.DOUBLE,
        duration: Sequelize.INTEGER,
      },
      { sequelize }
    );
  }
}

export default GymPlan;
