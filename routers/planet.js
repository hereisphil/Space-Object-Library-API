const express = require(`express`);
const planetCtlr = require(`../controllers/planet.js`);
const router = new express.Router();
// Get all planets
router.get(`/`, planetCtlr.index);

/* -------------------------------------------------------------------------- */
/*                        Using Multer for File Uploads                       */
/* -------------------------------------------------------------------------- */
// Multer documentation: https://www.npmjs.com/package/multer
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, "public/uploads/planets");
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

router.post(`/`, upload.single("image"), planetCtlr.create);

// New routes for Twig templates
router.get(`/new`, planetCtlr.form);
router.get(`/:id/edit`, planetCtlr.form);
router.get(`/:id/delete`, planetCtlr.remove);
router.post(`/:id`, upload.single("image"), planetCtlr.update);

// curl http://localhost:3000/planets/3
router.get(`/:id`, planetCtlr.show);

// curl -X PUT -H "Content-Type: application/json" -d '{"description":"Updated description"}' http://localhost:3000/planets/2
router.put(`/:id`, planetCtlr.update);

// curl -X DELETE http://localhost:3000/planets/2
router.delete(`/:id`, planetCtlr.remove);

// curl -X POST http://localhost:3000/planets/2/stars/3
router.post(`/:id/stars/:starId`, planetCtlr.addOneStar);

module.exports = router;
