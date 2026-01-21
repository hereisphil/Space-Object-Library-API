"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn("Stars", "size", {
            type: Sequelize.INTEGER,
        });
        await queryInterface.addColumn("Stars", "description", {
            type: Sequelize.TEXT,
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn("Planets", "size");
        await queryInterface.removeColumn("Planets", "description");
    },
};
