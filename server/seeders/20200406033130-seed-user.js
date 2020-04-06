'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'fadhil@mail.com',
      password: hashPassword('fadhilman'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'something@mail.com',
      password: hashPassword('fadhilman'),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {})
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
