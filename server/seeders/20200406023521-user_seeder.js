'use strict';

const users = require('../user.json')

users.forEach(el => {
    el.createdAt = new Date()
    el.updatedAt = new Date()
});


module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', users, {} )
    
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
