import Sequelize from 'sequelize';

import Student from '../app/models/Student';
import User from '../app/models/User';
import GymPlan from '../app/models/GymPlan';
import Registration from '../app/models/Registration';

import databaseConfig from '../config/database';

const models = [Student, User, GymPlan, Registration];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
