'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'XL',
        nominal: 5000,
        sellPrice: 100000,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'XL',
        nominal: 10000,
        sellPrice: 1000000,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name: 'XL',
        nominal: 25000,
        sellPrice: 10000000,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name: 'XL',
        nominal: 50000,
        sellPrice: 10000000,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name: 'XL',
        nominal: 100000,
        sellPrice: 1000000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
