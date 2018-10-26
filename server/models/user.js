'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
        isUnique: function (value, next) {
          User.findOne({
            where: { email: value }
          })
            .then(data => data ? next('Email has been used.') : next())
            .catch(err => { throw err })
        }
      }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Product, {through: models.Transactions})
  };
  return User;
};