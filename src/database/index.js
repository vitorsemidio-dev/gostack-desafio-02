import Sequelize from 'sequelize';

import Student from '../app/models/Student';
import User from '../app/models/User';
import GymPlan from '../app/models/GymPlan';

import databaseConfig from '../config/database';

const models = [Student, User, GymPlan];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
