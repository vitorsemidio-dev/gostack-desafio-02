import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        created_at: new Date(),
        updated_at: new Date(),
      },
      { sequelize }
    );
  }
}

export default User;
