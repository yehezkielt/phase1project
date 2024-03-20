'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //   User.belongsToMany(models.Symptom, {through: Disease})
    //   User.hasMany(models.Disease)
    //   User.belongsTo(models.Medical_Record, {foreignKey: Medical_RecordsId})
    //   User.hasMany(models.Test_Lab)
    //   User.hasOne(models.User_Detail)
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    Medical_RecordId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};