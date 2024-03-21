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
      User.belongsToMany(models.Disease, {through: models.Medical_Record})
      User.belongsToMany(models.Disease, {through: models.Medical_Record})
    //   User.hasMany(models.Disease)
    //   User.belongsTo(models.Medical_Record, {foreignKey: Medical_RecordsId})
      User.hasMany(models.Medical_Record)
      User.hasOne(models.User_Detail)
    }

    get usernameFormat () {
        return `Mr. ${this.username}`
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        validate: {
          notEmail : {
            msg: 'Email Cant Be Empty'
          }
        }
      },
  
    password: DataTypes.STRING,
    role: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            notEmpty: {
                msg: `require of Position`
            },
            notNull: {
                msg: `require of Position`
            },
            validateRole (value) {
                if(value !== 'Patients' || value !== 'Doctors'){
                    throw new Error(`role can only be a Patients or Doctors`)
                }
            }
        }
    },
    User_DetailsId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    
  });
  return User;
};