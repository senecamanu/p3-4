'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {
    date: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {});
  Transactions.associate = function(models) {
    // associations can be defined here
    Transactions.belongsTo(models.User)
    Transactions.belongsTo(models.Product)


  };
  return Transactions;
};