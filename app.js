const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const static = express.static(__dirname + "/public");

// serve static assets
// app.use(express.static("public"));
app.use("/public", static);

// Use body parser to obtain user search query
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: false }));

// Set pug as our template engine
app.engine("pug", require("pug").__express);
app.set("view engine", "pug");

// application routes
app.get("/", (req, res) => {
  // homepage
  res.render("index", {
    view: "home"
  });
});

app.get("/search", (req, res) => {
  res.render("index", {
    view: "search"
  });
});

app.get("/player", (req, res) => {
  res.render("index", {
    view: "player"
  });
});

app.listen(3000, () => {
  console.log("App is running on localhost:3000!");
});
