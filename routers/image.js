const express = require("express");
const router = express.Router();

// Load in controller
const imageCtrl = require("../controllers/image");

// Load in middleware
const { uploadImage } = require("../middleware");

// Setup routes
router.get("/", imageCtrl.index);
router.get("/new", imageCtrl.form);
router.get("/:id", imageCtrl.show);
router.get("/:id/edit", imageCtrl.form);

// Added our uploadImage middleware to our create route
router.post("/", imageCtrl.create, uploadImage);
// Added our uploadImage middleware to our update route
router.post("/:id", imageCtrl.update, uploadImage);

router.delete("/:id", imageCtrl.remove);
router.get("/:id/delete", imageCtrl.remove);

module.exports = router;
