// Load in Express framework
const express = require(`express`);

// Load in our controller/action instances
const galaxyCtlr = require(`../controllers/galaxy.js`);

// Create a new Router instance and call it "router"
const router = new express.Router();

// RESTful resource mappings
// curl http://localhost:3000/galaxies
router.get(`/`, galaxyCtlr.index);

// curl -X POST -H "Content-Type: application/json" -d '{"name":"Milky Way Tres","size":100000,"description":"Spiral galaxy containing Earth"}' http://localhost:3000/galaxies
router.post(`/`, galaxyCtlr.create);

// curl http://localhost:3000/galaxies/3
router.get(`/:id`, galaxyCtlr.show);

// curl -X PUT -H "Content-Type: application/json" -d '{"description":"Updated galaxy description"}' http://localhost:3000/galaxies/2
router.put(`/:id`, galaxyCtlr.update);

// curl -X DELETE http://localhost:3000/galaxies/3
router.delete(`/:id`, galaxyCtlr.remove);

// export "router"
module.exports = router;
