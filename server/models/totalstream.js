'use strict';
module.exports = (sequelize, DataTypes) => {
  const TotalStream = sequelize.define('TotalStream', {
    date: DataTypes.DATE,
    income: DataTypes.INTEGER,
    outcome: DataTypes.INTEGER
  }, {});
  TotalStream.associate = function(models) {
    // associations can be defined here
  };
  return TotalStream;
};