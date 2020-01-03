import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import Student from '../app/models/Student';
import User from '../app/models/User';
import GymPlan from '../app/models/GymPlan';
import Registration from '../app/models/Registration';
import Checkin from '../app/models/Checkin';

import databaseConfig from '../config/database';

const models = [Student, User, GymPlan, Registration, Checkin];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gympoint',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
