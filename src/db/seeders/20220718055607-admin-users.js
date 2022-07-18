'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('users', [
      {
        name: 'Victor Araya',
        email: 'victor.araya@olxautos.com',
        password: '$2b$10$1KFGI.7hMYiTfziAdeV9geaeCeViux0M6e8yELJ5ciMyAV4wCCucG',
        // password: victor.123
        cms_user_id: '0495cb22-0e9f-4b34-928e-9876e2577f9e',
        role: 'admin',
        first_logged_in: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Nataniel Donoso',
        email: 'nataniel.donoso@olxautos.com',
        password: '$2b$10$XQHQMb2Ai7iuUqZgFZqSo.vTmUfwjX9OwlmH/vYJ.PhVqGkPx0rG.',
        // password: nata.123
        cms_user_id: '0495cb22-0e9f-4b34-928e-9876e2577f9e',
        role: 'executive',
        first_logged_in: null,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {})
  }
}
