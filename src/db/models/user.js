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
      this.hasMany(models.Reference, {
        foreignKey: 'user_id',
        as: 'references'
      })
    }
  };
  User.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "executive",
    },
    cms_user_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    recovery_token: DataTypes.STRING,
    first_logged_in: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
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
