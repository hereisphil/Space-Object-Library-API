"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Planets", "starId");
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn("Planets", "starId", {
            type: Sequelize.INTEGER,
            allowNull: true,
        });
    },
};
