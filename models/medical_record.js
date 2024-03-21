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

    static async summary () {
        const number = await Medical_Record.findOne({
            raw: true,
            attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total']]
        })
        const result = `Jumlah seluruh medical record adalah ${number.total}`
        return result
    }
  }
  Medical_Record.init({
    history: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull:{
            msg: 'history Cant Be Empty'
          },
          notEmpty: {
            msg: 'history Cant Be Empty'
          }
        }
      },
  
    date: DataTypes.DATE,
    medicine: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull:{
            msg: 'medicine Cant Be Empty'
          },
          notEmpty: {
            msg: 'medicine Cant Be Empty'
          }
        }
      },
  
    UserId : DataTypes.INTEGER,
    DiseaseId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Medical_Record',
        hooks: {
          beforeCreate: (user, options) => {
            user.medicine = 'panadol';
          },
        },
  });
  return Medical_Record;
};