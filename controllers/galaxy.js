const { Galaxy } = require("../models");

/* -------------------------------------------------------------------------- */
/*                              GET All Galaxies                              */
/* -------------------------------------------------------------------------- */
const index = async (_req, res) => {
    try {
        const galaxies = await Galaxy.findAll();
        // Use the Express built-in content negotiaion to properly return
        return res.format({
            "application/json": () => res.json(galaxies),
            "text/html": () =>
                res.render("galaxies/index.html.twig", { galaxies }),
            default: () => res.status(406).send("Not Acceptable"),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/* -------------------------------------------------------------------------- */
/*                             GET A Galaxy By ID                             */
/* -------------------------------------------------------------------------- */
const show = async (req, res) => {
    try {
        const galaxy = await Galaxy.findByPk(req.params.id);
        if (!galaxy)
            return res.status(404).json({ message: "Galaxy not found" });

        const stars = await galaxy.getStars();

        // Use the Express built-in content negotiaion to properly return
        return res.format({
            "application/json": () => res.json({ galaxy, stars }),
            "text/html": () =>
                res.render("galaxies/individual.html.twig", { galaxy }),
            default: () => res.status(406).send("Not Acceptable"),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/* -------------------------------------------------------------------------- */
/*                            POST Create A Galaxy                            */
/* -------------------------------------------------------------------------- */
const create = async (req, res) => {
    try {
        const galaxy = await Galaxy.create({
            ...req.body,
            image: req.file?.filename ?? null,
        });

        // Use the Express built-in content negotiaion to properly return
        return res.format({
            "application/json": () => res.json(galaxy),
            "text/html": () => res.redirect(`/galaxies/${galaxy.id}`),
            default: () => res.status(406).send("Not Acceptable"),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/* -------------------------------------------------------------------------- */
/*                             PUT Update A Galaxy                            */
/* -------------------------------------------------------------------------- */
const update = async (req, res) => {
    try {
        const existing = await Galaxy.findByPk(req.params.id);
        if (!existing)
            return res.status(404).json({ message: "Galaxy not found" });

        // Keep existing image unless a new file was uploaded
        const image = req.file?.filename ?? existing.image ?? null;

        const galaxy = await Galaxy.update(
            { ...req.body, image: image },
            {
                where: {
                    id: req.params.id,
                },
            },
        );

        // Use the Express built-in content negotiaion to properly return
        return res.format({
            "application/json": () => res.json(galaxy),
            "text/html": () => res.redirect(`/galaxies/${req.params.id}`),
            default: () => res.status(406).send("Not Acceptable"),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/* -------------------------------------------------------------------------- */
/*                               DELETE A Galaxy                              */
/* -------------------------------------------------------------------------- */
const remove = async (req, res) => {
    try {
        const result = await Galaxy.destroy({
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
            const galaxy = await Galaxy.findByPk(req.params.id);
            if (!galaxy) return res.render("galaxies/form.html.twig");
            return res.render("galaxies/form.html.twig", { galaxy });
        } else {
            return res.render("galaxies/form.html.twig");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Export all controller actions
module.exports = { index, show, create, update, remove, form };
