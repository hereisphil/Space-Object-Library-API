// Load in Express framework
const express = require(`express`);

// Load in our controller/action instances
const starCtlr = require(`../controllers/star.js`);

// Create a new Router instance and call it "router"
const router = new express.Router();

// RESTful resource mappings
// curl http://localhost:3000/stars
router.get(`/`, starCtlr.index);

// curl -X POST -H "Content-Type: application/json" -d '{"name":"Sun Tres","size":1392000,"description":"Main sequence star","GalaxyId":1}' http://localhost:3000/stars
router.post(`/`, starCtlr.create);

// curl http://localhost:3000/stars/1
router.get(`/:id`, starCtlr.show);

// curl -X PUT -H "Content-Type: application/json" -d '{"name":"Sun 4"}' http://localhost:3000/stars/4
router.put(`/:id`, starCtlr.update);

// curl -X DELETE http://localhost:3000/stars/4
router.delete(`/:id`, starCtlr.remove);

// export "router"
module.exports = router;
