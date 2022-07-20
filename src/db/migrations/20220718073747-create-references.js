'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('references', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      reference: {
        allowNull: false,
        type: Sequelize.STRING
      },
      free_positions: {
        allowNull: false,
        type: Sequelize.STRING
      },
      due_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      amount: {
        allowNull: false,
        type: Sequelize.DOUBLE(10,2)
      },
      base: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      free_digit: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('references');
  }
};