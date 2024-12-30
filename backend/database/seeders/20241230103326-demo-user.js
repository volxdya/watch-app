'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.bulkInsert(
      'users',
      [
        {
          username: 'user1',
          description: 'User 1 description',
          avatar: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'user2',
          description: 'User 2 description',
          avatar: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true },
    );

    const user1 = users.find((u) => u.username === 'user1');
    const user2 = users.find((u) => u.username === 'user2');

    await queryInterface.bulkInsert(
      'videos',
      [
        {
          title: 'Video 1 for user 1',
          userId: user1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Video 2 for user 1',
          userId: user1.id,
          videoFile: 'test',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Video 1 for user 2',
          userId: user2.id,
          videoFile: 'test',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('videos', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};