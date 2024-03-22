'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Disease, {through: models.Medical_Record})
    //   User.hasMany(models.Disease)
    //   User.belongsTo(models.Medical_Record, {foreignKey: Medical_RecordsId})
      User.hasMany(models.Medical_Record)
      User.hasOne(models.User_Detail, {foreignKey:'User_DetailsId'})
    }

    get usernameFormat () {
        return `Mr. ${this.username}`
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty : {
            msg: 'Email Cant Be Empty'
          },
          notNull:{
            msg: 'Email Cant Be Empty'
          }
        }
      },
  
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'Password cant be empty'
        },
        notNull: {
          msg: 'Password cant be empty'
        },
        validatePassword(){
          if (this.password.length < 5) {
            throw new Error ('Password must be 5 characters')
          }
        }
      }
    },
    role: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            notEmpty: {
                msg: `require of Position`
            },
            notNull: {
                msg: `require of Position`
            }
        }
    },
    User_DetailsId : DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate(instance, options){
        let salt = bcrypt.genSaltSync(8);
        let hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
      },
    },
    sequelize,
    modelName: 'User',
    
  });
  return User;
};