const { Planet, Star } = require("../models");

/* -------------------------------------------------------------------------- */
/*                               GET All Planets                              */
/* -------------------------------------------------------------------------- */
const index = async (_req, res) => {
    try {
        // get planets and include its star
        const planets = await Planet.findAll({
            include: [Star],
        });

        // Use the Express built-in content negotiaion to properly return
        return res.format({
            "application/json": () => res.json(planets),
            "text/html": () =>
                res.render("planets/index.html.twig", { planets }),
            default: () => res.status(406).send("Not Acceptable"),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/* -------------------------------------------------------------------------- */
/*                             GET A Planet By ID                             */
/* -------------------------------------------------------------------------- */
const show = async (req, res) => {
    try {
        const planet = await Planet.findByPk(req.params.id);
        if (!planet)
            return res.status(404).json({ message: "Planet not found" });

        const star = await planet.getStars();

        // Use the Express built-in content negotiaion to properly return
        return res.format({
            "application/json": () => res.json({ planet, star }),
            "text/html": () =>
                res.render("planets/individual.html.twig", { planet }),
            default: () => res.status(406).send("Not Acceptable"),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/* -------------------------------------------------------------------------- */
/*                            POST Create A Planet                            */
/* -------------------------------------------------------------------------- */
const create = async (req, res) => {
    try {
        const planet = await Planet.create({
            ...req.body,
            image: req.file?.filename ?? null,
        });

        // Use the Express built-in content negotiaion to properly return
        return res.format({
            "application/json": () => res.json(planet),
            "text/html": () => res.redirect(`/planets/${planet.id}`),
            default: () => res.status(406).send("Not Acceptable"),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/* -------------------------------------------------------------------------- */
/*                             PUT Update a Planet                            */
/* -------------------------------------------------------------------------- */
const update = async (req, res) => {
    try {
        const planet = await Planet.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        // Use the Express built-in content negotiaion to properly return
        return res.format({
            "application/json": () => res.json(planet),
            "text/html": () => res.redirect(`/planets/${req.params.id}`),
            default: () => res.status(406).send("Not Acceptable"),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/* -------------------------------------------------------------------------- */
/*                               DELETE A Planet                              */
/* -------------------------------------------------------------------------- */
const remove = async (req, res) => {
    try {
        const result = await Planet.destroy({ where: req.params });

        // Use the Express built-in content negotiaion to properly return
        return res.format({
            "application/json": () => res.json(result),
            "text/html": () => res.redirect(`/planets/`),
            default: () => res.status(406).send("Not Acceptable"),
        });
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
