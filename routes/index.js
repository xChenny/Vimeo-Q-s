const player = require("./player");
const search = require("./search");

const routes = app => {
  app.get("/", (req, res) => {
    res.render("index", {
      view: "home"
    });
  });
  app.use("/search", search);
  app.use("/player", player);
  app.get("*", (req, res) => {
    res.status(404).send("Route not found!");
  });
};

module.exports = routes;
