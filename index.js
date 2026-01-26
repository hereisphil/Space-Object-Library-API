// Load in our Express framework
const express = require(`express`);

const twig = require("twig");

// Create a new Express instance called "app"
const app = express();

// allow JSON body requests
app.use(express.json());

app.set("view engine", twig);
app.set("twig options", {
    allowAsync: true,
    strict_variables: false,
});
app.set("views", __dirname + "/templates");

// Load in our RESTful routers
const routers = require("./routers/index.js");

// Home page welcome middleware
app.get("/", (_req, res) => {
    // res.status(200).send("Welcome to Star Tracker Library");
    res.render("views/index.html.twig");
});

// Register our RESTful routers with our "app"
app.use(`/planets`, routers.planet);
app.use(`/stars`, routers.star);
app.use(`/galaxies`, routers.galaxy);

// 404 Route
app.all("*", (req, res) => {
    res.status(404).json({
        error: "Endpoint not found",
        path: req.originalUrl,
        method: req.method,
    });
});

// Set our app to listen on port 3000
app.listen(3000);
