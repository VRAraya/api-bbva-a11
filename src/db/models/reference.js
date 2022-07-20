'use strict'
const apiService = require('../../services/apiService').build()
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Reference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'users'
      })
    }
  }
  Reference.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    reference: {
      type: DataTypes.STRING
    },
    free_positions: {
      allowNull: false,
      type: DataTypes.STRING
    },
    amount: {
      allowNull: false,
      type: DataTypes.DOUBLE(10,2)
    },
    due_date: {
      allowNull: false,
      type: DataTypes.DATE
    },    
    base: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    free_digit: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Reference',
    tableName: 'references',
    underscored: true,
    updatedAt: false,
    hooks: {
      beforeCreate: async (reference, options) => {
        if(!reference.reference) {
          const {due_date, amount, free_positions, base, free_digit} = reference
          const paymentReference = await apiService.applyElevenAlgorithm(due_date, amount, free_positions, base, free_digit)
          reference.reference = paymentReference
        }
      }
    },
  })
  return Reference
}