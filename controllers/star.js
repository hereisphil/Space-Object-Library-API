const { Star, Galaxy } = require("../models");

/* -------------------------------------------------------------------------- */
/*                                GET All Stars                               */
/* -------------------------------------------------------------------------- */
const index = async (_req, res) => {
    try {
        const stars = await Star.findAll({
            include: [Galaxy],
        });

        // Use the Express built-in content negotiaion to properly return
        return res.format({
            "application/json": () => res.json(stars),
            "text/html": () => res.render("stars/index.html.twig", { stars }),
            default: () => res.status(406).send("Not Acceptable"),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/* -------------------------------------------------------------------------- */
/*                              GET A Star By ID                              */
/* -------------------------------------------------------------------------- */
const show = async (req, res) => {
    try {
        const star = await Star.findByPk(req.params.id);
        if (!star) return res.status(404).json({ message: "Star not found" });

        const planets = await star.getPlanets();

        // Use the Express built-in content negotiaion to properly return
        return res.format({
            "application/json": () => res.json({ star, planets }),
            "text/html": () =>
                res.render("stars/individual.html.twig", { star }),
            default: () => res.status(406).send("Not Acceptable"),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/* -------------------------------------------------------------------------- */
/*                             POST Create A Star                             */
/* -------------------------------------------------------------------------- */
const create = async (req, res) => {
    try {
        const star = await Star.create({
            ...req.body,
            image: req.file?.filename ?? null,
        });

        // Use the Express built-in content negotiaion to properly return
        return res.format({
            "application/json": () => res.json(star),
            "text/html": () => res.redirect(`/stars/${star.id}`),
            default: () => res.status(406).send("Not Acceptable"),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/* -------------------------------------------------------------------------- */
/*                              PUT Update A Star                             */
/* -------------------------------------------------------------------------- */
const update = async (req, res) => {
    try {
        const existing = await Star.findByPk(req.params.id);
        if (!existing)
            return res.status(404).json({ message: "Star not found" });

        // Keep existing image unless a new file was uploaded
        const image = req.file?.filename ?? existing.image ?? null;

        const star = await Star.update(
            { ...req.body, image: image },
            {
                where: {
                    id: req.params.id,
                },
            },
        );

        // Use the Express built-in content negotiaion to properly return
        return res.format({
            "application/json": () => res.json(star),
            "text/html": () => res.redirect(`/stars/${req.params.id}`),
            default: () => res.status(406).send("Not Acceptable"),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/* -------------------------------------------------------------------------- */
/*                                DELETE A Star                               */
/* -------------------------------------------------------------------------- */
const remove = async (req, res) => {
    try {
        const result = await Star.destroy({
            where: req.params,
        });

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
/*                           New Form Route for Twig                          */
/* -------------------------------------------------------------------------- */
const form = async (req, res) => {
    try {
        if (req.params.id) {
            const star = await Star.findByPk(req.params.id);
            if (!star) return res.render("stars/form.html.twig");
            return res.render("stars/form.html.twig", { star });
        } else {
            return res.render("stars/form.html.twig");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Export all controller actions
module.exports = { index, show, create, update, remove, form };
