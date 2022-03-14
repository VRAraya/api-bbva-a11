'use strict'

const { Model } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    cms_user_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    hooks: {
      beforeCreate: async (user, options) => {
        const password = await bcrypt.hash(user.password, 10)
        user.password = password
      },
      beforeUpdate: async (user, options) => {
        if (user.password) {
          const password = await bcrypt.hash(user.password, 10)
          user.password = password
        }
      }
    },
    defaultScope: {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    }
  })
  return User
}
