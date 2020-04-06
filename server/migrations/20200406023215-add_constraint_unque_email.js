'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Users', ['email'], {
      type: 'unique',
      name: 'custom_constraint_unique_email'
    })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeConstraint('Users', 'custom_constraint_unique_email')
  }
};
