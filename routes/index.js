const player = require("./player");
const search = require("./search");

/**
 * add routes to the express server
 * @param {express app} app - this is the express() object that represents the server
 */
const routes = app => {
  // home page
  app.get("/", (req, res) => {
    res.render("index", {
      view: "home"
    });
  });

  // search page
  app.use("/search", search);

  // video player page
  app.use("/player", player);

  // other pages
  app.get("*", (req, res) => {
    res.status(404).send("Route not found!");
  });
};

module.exports = routes;
