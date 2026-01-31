// Load in Express framework
const express = require(`express`);

// Load in our controller/action instances
const planetCtlr = require(`../controllers/planet.js`);

// Create a new Router instance and call it "router"
const router = new express.Router();

// RESTful resource mappings
// curl http://localhost:3000/planets
router.get(`/`, planetCtlr.index);

// curl -X POST -H "Content-Type: application/json" -d '{"name":"Earth Dues","mass":123456,"size":10033,"isGasGiant":false,"description":"Habitable planet"}' http://localhost:3000/planets
router.post(`/`, planetCtlr.create);

// New routes for Twig templates
router.get(`/new`, planetCtlr.form);
router.get(`/:id/edit`, planetCtlr.form);
router.get(`/:id/delete`, planetCtlr.remove);
router.post(`/:id`, planetCtlr.update);

// curl http://localhost:3000/planets/3
router.get(`/:id`, planetCtlr.show);

// curl -X PUT -H "Content-Type: application/json" -d '{"description":"Updated description"}' http://localhost:3000/planets/2
router.put(`/:id`, planetCtlr.update);

// curl -X DELETE http://localhost:3000/planets/2
router.delete(`/:id`, planetCtlr.remove);

// curl -X POST http://localhost:3000/planets/2/stars/3
router.post(`/:id/stars/:starId`, planetCtlr.addOneStar);

// export "router"
module.exports = router;
