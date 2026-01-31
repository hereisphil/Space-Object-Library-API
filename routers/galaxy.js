const express = require(`express`);
const galaxyCtlr = require(`../controllers/galaxy.js`);
const router = new express.Router();
// Get all galaxies
router.get(`/`, galaxyCtlr.index);

/* -------------------------------------------------------------------------- */
/*                        Using Multer for File Uploads                       */
/* -------------------------------------------------------------------------- */
// Multer documentation: https://www.npmjs.com/package/multer
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, "public/uploads/galaxies");
    },
    filename: function (_req, file, cb) {
        // CLEAN UP the uploaded filename
        const nameWithoutExt = path.parse(file.originalname).name;
        const ext = path.extname(file.originalname);
        const cleanName = nameWithoutExt
            .trim()
            .replace(/[^\w-]/g, "")
            .replace(/\s+/g, "-");
        const uniqueFilename = `${Date.now()}-${cleanName}${ext}`;

        cb(null, uniqueFilename);
    },
});
const upload = multer({ storage });

router.post(`/`, upload.single("image"), galaxyCtlr.create);

// New routes for Twig templates
router.get(`/new`, galaxyCtlr.form);
router.get(`/:id/edit`, galaxyCtlr.form);
router.get(`/:id/delete`, galaxyCtlr.remove);
router.post(`/:id`, upload.single("image"), galaxyCtlr.update);

// curl http://localhost:3000/galaxies/3
router.get(`/:id`, galaxyCtlr.show);

// curl -X PUT -H "Content-Type: application/json" -d '{"description":"Updated galaxy description"}' http://localhost:3000/galaxies/2
router.put(`/:id`, galaxyCtlr.update);

// curl -X DELETE http://localhost:3000/galaxies/3
router.delete(`/:id`, galaxyCtlr.remove);

// export "router"
module.exports = router;
