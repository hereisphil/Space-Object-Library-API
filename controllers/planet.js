const { Planet, Star } = require("../models");

// Show all resources
const index = async (_req, res) => {
    try {
        const planets = await Planet.findAll({
            include: [Star],
        });
        // return res.status(200).json(planets);
        return res.render("planets/index.html.twig", { planets });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Show resource
const show = async (req, res) => {
    try {
        const planet = await Planet.findByPk(req.params.id);
        if (!planet)
            return res.status(404).json({ message: "Planet not found" });

        const star = await planet.getStars();
        // Respond with a single object and 2xx code
        // return res.status(200).json({ planet, star });
        return res.render("planets/individual.html.twig", { planet });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Create a new resource
const create = async (req, res) => {
    try {
        const planet = await Planet.create(req.body);

        // return res.status(201).json(planet);
        return res.render("planets/individual.html.twig", { planet });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update an existing resource
const update = async (req, res) => {
    try {
        const planet = await Planet.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        // Respond with a single resource and 2xx code
        return res.status(200).json(planet);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Remove a single resource
const remove = async (req, res) => {
    try {
        await Planet.destroy({ where: req.params });
        const planets = await Planet.findAll({
            include: [Star],
        });
        // return res.status(204).json(result);
        return res.render("planets/index.html.twig", { planets });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/* -------------------------------------------------------------------------- */
/*                    Add Star to Planet (Many-to-Many)                    */
/* -------------------------------------------------------------------------- */
const addOneStar = async (req, res) => {
    try {
        const { id, starId } = req.params;

        const planet = await Planet.findByPk(id);
        if (!planet)
            return res.status(404).json({ message: `No planet ${id}` });

        await planet.addStar(Number(starId));

        const updated = await Planet.findByPk(id, { include: Star });
        return res.status(200).json(updated);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/* -------------------------------------------------------------------------- */
/*                           New Form Route for Twig                          */
/* -------------------------------------------------------------------------- */
const form = async (req, res) => {
    try {
        if (req.params.id) {
            const planet = await Planet.findByPk(req.params.id);
            if (!planet) return res.render("planets/form.html.twig");
            return res.render("planets/form.html.twig", { planet });
        } else {
            return res.render("planets/form.html.twig");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Export all controller actions
module.exports = { index, show, create, update, remove, addOneStar, form };
