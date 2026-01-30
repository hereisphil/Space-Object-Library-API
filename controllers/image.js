/* -------------------------------------------------------------------------- */
/*                              POST Add An Image                             */
/* -------------------------------------------------------------------------- */
const create = async (req, res, next) => {
    try {
        const image = await Image.create(req.body);
        // Sets a pretext "imageId" for our upload middleware
        req.imageId = image.id;
        // Invoke our upload middleware with next()
        next();
        return res.redirect("/images/" + image.id);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/* -------------------------------------------------------------------------- */
/*                            PUT Replace An Image                            */
/* -------------------------------------------------------------------------- */
const update = async (req, res, next) => {
    try {
        const image = await Image.update(req.body, {
            where: { id: req.params.id },
        });
        // Sets a pretext "imageId" for our upload middleware
        req.imageId = req.params.id;
        // Invoke our upload middleware with next()
        next();
        return res.redirect("/images/" + req.params.id);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
