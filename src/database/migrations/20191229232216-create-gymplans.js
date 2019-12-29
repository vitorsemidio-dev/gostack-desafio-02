module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('gymplans', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('gymplans');
  },
};
