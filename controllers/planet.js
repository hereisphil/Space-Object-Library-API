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

/* -------------------------------------------------------------------------- */
/*                    Add Star to Planet (Many-to-Many)                    */
/* -------------------------------------------------------------------------- */
// POST /planets/:id/stars
const addStar = async (req, res) => {
    try {
        // Extract the request parameter and body
        const { id } = req.params;
        if (!id)
            return res
                .status(404)
                .json({ message: "Resend request with a Planet Id" });
        const { starIds } = req.body;
        if (!starIds)
            return res
                .status(404)
                .json({ message: "Resend request with Star Id(s)" });

        // Look for the planet
        const updatedPlanet = await Planet.findByPk(id);
        if (!planet)
            return res
                .sendStatus(404)
                .json({ message: `No planet found with ID: ${id} ` });

        // try to update the planet
        await updatedPlanet.addStars(starIds);

        // get the update to return
        const updated = await Planet.findByPk(id, { include: Star });
        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500);
    }
};

// Export all controller actions
module.exports = { index, show, create, update, remove, addStar };
