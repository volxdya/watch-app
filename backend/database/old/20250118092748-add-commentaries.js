'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('commentary', {
      id: Sequelize.INTEGER,
      userId: Sequelize.INTEGER,
      videoId: Sequelize.INTEGER,
      text: Sequelize.STRING
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
