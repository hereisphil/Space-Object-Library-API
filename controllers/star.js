const { Star } = require("../models");

// Show all resources
const index = async (req, res) => {
    const stars = await Star.findAll();
    res.status(200).json(stars);
};

// Show a single resource
const show = async (req, res) => {
    const star = await Star.findByPk(req.params.id);
    const planets = await star.getPlanets();
    res.status(200).json({ star, planets });
};

// Create a new resource
const create = async (req, res) => {
    const star = await Star.create(req.body);
    res.status(201).json(star);
};

// Update an existing resource
const update = async (req, res) => {
    const star = await Star.update(req.body, {
        where: {
            id: req.params.id,
        },
    });
    res.status(200).json(star);
};

// Remove a single resource
const remove = async (req, res) => {
    const result = await Star.destroy({
        where: req.params,
    });
    res.status(204).json(result);
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
