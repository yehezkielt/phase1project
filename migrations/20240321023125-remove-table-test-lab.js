'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.dropTable('Test_Labs')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Test_Labs', 
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        pictureScan: {
          type: Sequelize.STRING
        },
        result: {
          type: Sequelize.STRING
        },
        UserId: {
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    )
  }
};
