const express = require(`express`);
const twig = require("twig");
const app = express();

// For HTML form POSTs
app.use(
    express.urlencoded({
        extended: true,
        inflate: true,
        limit: "1mb",
        parameterLimit: 5000,
        type: "application/x-www-form-urlencoded",
    }),
);

// For JSON API requests
app.use(express.json());

// Add the public folder to allow Express to serve it
app.use(express.static("public"));

app.set("view engine", twig);
app.set("twig options", {
    allowAsync: true,
    strict_variables: false,
});
app.set("views", __dirname + "/templates");

const routers = require("./routers/index.js");
// Home page welcome middleware
app.get("/", (_req, res) => {
    res.render("views/index.html.twig", {
        fname: "Phillip",
        lname: "Cantu",
        contacts: [
            { fname: "Joe", lname: "Dirt", age: 40 },
            { fname: "Jane", lname: "Dirt", age: 20 },
        ],
    });
});

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

app.listen(3000, () => {
    console.log("NodeJS/Express App running on http://localhost:3000");
});
