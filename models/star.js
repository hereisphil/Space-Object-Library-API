"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Star extends Model {
        static associate(models) {
            models.Star.belongsToMany(models.Planet, {
                through: models.StarsPlanets,
                foreignKey: "starId",
                otherKey: "planetId",
            });
            models.Star.belongsTo(models.Galaxy);
        }
    }
    Star.init(
        {
            name: DataTypes.STRING,
            size: DataTypes.INTEGER,
            description: DataTypes.TEXT,
            galaxyId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Star",
        },
    );
    return Star;
};
