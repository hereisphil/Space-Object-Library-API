const express = require(`express`);
const twig = require("twig");
const app = express();

/* -------------------------------------------------------------------------- */
/*                        Using Multer for File Uploads                       */
/* -------------------------------------------------------------------------- */
// Multer documentation: https://www.npmjs.com/package/multer
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, "./public/uploads");
    },
    filename: function (_req, file, cb) {
        const uniqueFilename = Date.now() + "-" + file.originalname;
        cb(null, uniqueFilename);
    },
});
const upload = multer({ storage });

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

/* -------------------------------------------------------------------------- */
/*                       Multer Upload Route for Testing                      */
/* -------------------------------------------------------------------------- */
app.post("/upload", upload.single("file"), (req, res) => {
    // Make sure a file is being uploaded
    if (!req.file) {
        return res.status(400).json({
            error: "No file received.",
        });
    }
    // Make sure it's only an image file
    if (!req.file.mimetype.includes("image")) {
        return res.status(400).json({
            error: "Only image files are accepted.",
        });
    }
    res.json(req.file);
});

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
