'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Food', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }

    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Food', 'userId')
  }
};
