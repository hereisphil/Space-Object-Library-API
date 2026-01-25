const { Galaxy } = require("../models");

// Show all resources
const index = async (_req, res) => {
    try {
        const galaxies = await Galaxy.findAll();
        return res.status(200).json(galaxies);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Show a single resource
const show = async (req, res) => {
    try {
        const galaxy = await Galaxy.findByPk(req.params.id);
        if (!galaxy)
            return res.status(404).json({ message: "Galaxy not found" });

        const stars = await galaxy.getStars();
        return res.status(200).json({ galaxy, stars });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Create a new resource
const create = async (req, res) => {
    try {
        const galaxy = await Galaxy.create(req.body);
        return res.status(201).json(galaxy);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update an existing resource
const update = async (req, res) => {
    try {
        const galaxy = await Galaxy.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        return res.status(200).json(galaxy);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Remove a single resource
const remove = async (req, res) => {
    try {
        const result = await Galaxy.destroy({
            where: req.params,
        });
        return res.status(204).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
