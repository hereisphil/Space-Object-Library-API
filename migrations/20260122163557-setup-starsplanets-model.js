"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("StarsPlanets", {
            starId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: "Stars", // pluralized per actual Table name
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            planetId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: "Planets", // pluralized per actual Table name
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("StarsPlanets");
    },
};
