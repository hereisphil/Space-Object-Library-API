const { Planet, Star } = require("../models");

// Show all resources
const index = async (req, res) => {
    const planets = await Planet.findAll({
        include: [Star],
    });
    res.status(200).json(planets);
};

// Show resource
const show = async (req, res) => {
    const planet = await Planet.findByPk(req.params.id);
    const star = await planet.getStar();
    // Respond with a single object and 2xx code
    res.status(200).json({ planet, star });
};

// Create a new resource
const create = async (req, res) => {
    const planet = await Planet.create(req.body);

    // Return planet created
    res.status(201).json(planet);
};

// Update an existing resource
const update = async (req, res) => {
    const planet = await Planet.update(req.body, {
        where: {
            id: req.params.id,
        },
    });
    // Respond with a single resource and 2xx code
    res.status(200).json(planet);
};

// Remove a single resource
const remove = async (req, res) => {
    const result = await Planet.destroy({
        where: req.params,
    });
    // Respond with a 2xx status code and bool
    res.status(204).json(result);
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
