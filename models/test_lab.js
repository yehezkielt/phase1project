'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Test_Lab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //   Test_Lab.belongsTo(models.User, {foreignKey: userId})
    }
  }
  Test_Lab.init({
    pictureScan: DataTypes.STRING,
    result: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Test_Lab',
  });
  return Test_Lab;
};