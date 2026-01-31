"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Planet extends Model {
        static associate(models) {
            models.Planet.belongsToMany(models.Star, {
                through: models.StarsPlanets,
                foreignKey: "planetId",
                otherKey: "starId",
            });
        }
    }
    Planet.init(
        {
            name: DataTypes.STRING,
            mass: DataTypes.INTEGER,
            size: DataTypes.INTEGER,
            isGasGiant: DataTypes.BOOLEAN,
            description: DataTypes.TEXT,
            image: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Planet",
        },
    );
    return Planet;
};
