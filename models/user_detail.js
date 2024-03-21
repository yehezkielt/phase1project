'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User_Detail.belongsTo(models.User)
    }
  }
  User_Detail.init({
    noAsuransi: DataTypes.STRING,
    guardian: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_Detail',
  });
  return User_Detail;
};