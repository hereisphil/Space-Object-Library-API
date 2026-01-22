"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class StarsPlanets extends Model {
        static associate(models) {
            // define association here
        }
    }
    StarsPlanets.init(
        {
            starId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            planetId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
        },
        {
            sequelize,
            modelName: "StarsPlanets",
            tableName: "StarsPlanets",
        },
    );
    return StarsPlanets;
};
