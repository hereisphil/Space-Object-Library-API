const { Star, Galaxy } = require("../models");

// Show all resources
const index = async (_req, res) => {
    try {
        const stars = await Star.findAll({
            include: [Galaxy],
        });
        return res.status(200).json(stars);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Show a single resource
const show = async (req, res) => {
    try {
        const star = await Star.findByPk(req.params.id);
        if (!star) return res.status(404).json({ message: "Star not found" });

        const planets = await star.getPlanets();
        return res.status(200).json({ star, planets });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Create a new resource
const create = async (req, res) => {
    try {
        const star = await Star.create(req.body);
        return res.status(201).json(star);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update an existing resource
const update = async (req, res) => {
    try {
        const star = await Star.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        return res.status(200).json(star);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Remove a single resource
const remove = async (req, res) => {
    try {
        const result = await Star.destroy({
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
