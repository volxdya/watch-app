'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('videos', 'url', {
      type: Sequelize.STRING,
      defaultValue: '',
    });
  },
};
