'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    nominal: DataTypes.INTEGER,
    sellPrice: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsToMany(models.User, {through: models.Transactions})
    
  };
  return Product;
};