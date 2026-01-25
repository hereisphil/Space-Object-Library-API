const { Galaxy } = require("../models");

// Show all resources
const index = async (req, res) => {
    const galaxies = await Galaxy.findAll();
    res.status(200).json(galaxies);
};

// Show a single resource
const show = async (req, res) => {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (!galaxy) return res.status(404).json({ message: "Galaxy not found" });
    const stars = await galaxy.getStars();
    res.status(200).json({ galaxy, stars });
};

// Create a new resource
const create = async (req, res) => {
    const galaxy = await Galaxy.create(req.body);
    res.status(201).json(galaxy);
};

// Update an existing resource
const update = async (req, res) => {
    const galaxy = await Galaxy.update(req.body, {
        where: {
            id: req.params.id,
        },
    });
    res.status(200).json(galaxy);
};

// Remove a single resource
const remove = async (req, res) => {
    const result = await Galaxy.destroy({
        where: req.params,
    });
    res.status(204).json(result);
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
