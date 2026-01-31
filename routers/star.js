const express = require(`express`);
const starCtlr = require(`../controllers/star.js`);
const router = new express.Router();
// Get all stars
router.get(`/`, starCtlr.index);

/* -------------------------------------------------------------------------- */
/*                        Using Multer for File Uploads                       */
/* -------------------------------------------------------------------------- */
// Multer documentation: https://www.npmjs.com/package/multer
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, "public/uploads/stars");
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

router.post(`/`, upload.single("image"), starCtlr.create);

// New routes for Twig templates
router.get(`/new`, starCtlr.form);
router.get(`/:id/edit`, starCtlr.form);
router.get(`/:id/delete`, starCtlr.remove);
router.post(`/:id`, upload.single("image"), starCtlr.update);

// curl http://localhost:3000/stars/1
router.get(`/:id`, starCtlr.show);

// curl -X PUT -H "Content-Type: application/json" -d '{"name":"Sun 4"}' http://localhost:3000/stars/4
router.put(`/:id`, starCtlr.update);

// curl -X DELETE http://localhost:3000/stars/4
router.delete(`/:id`, starCtlr.remove);

module.exports = router;
