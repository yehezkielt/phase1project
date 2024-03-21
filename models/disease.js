'use strict';
const {
  Model
} = require('sequelize');
const medical_record = require('./medical_record');
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Disease.belongsToMany(models.User, {through: models.Medical_Record})
      Disease.hasMany(models.Medical_Record)
    //   Disease.belongsTo(models.User, {foreignKey: userId})
    //   Disease.belongsTo(models.Symptom, {foreignKey: SymptomId})
    }
  }
  Disease.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    level: DataTypes.INTEGER,
    nameSymptom: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Disease',
  });
  return Disease;
};