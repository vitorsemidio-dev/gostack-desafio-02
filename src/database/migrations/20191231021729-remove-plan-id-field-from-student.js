module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn('students', 'plan_id');
  },

  down: () => {},
};
