'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medical_Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Medical_Record.belongsTo(models.User)
      Medical_Record.belongsTo(models.Disease)
    }
  }
  Medical_Record.init({
    history: DataTypes.STRING,
    date: DataTypes.DATE,
    medicine: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Medical_Record',
  });
  return Medical_Record;
};