require("dotenv").config();

const express = require("express");
const app = express();

const helmet = require("helmet");
const bodyParser = require("body-parser");

const static = express.static(__dirname + "/public");
const routes = require("./routes");

var port = process.env.PORT || 3000;

// serve static assets
app.use("/public", static);

// security
app.use(helmet());

// Use body parser to obtain user search query
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: false }));

// Set pug as our template engine
app.engine("pug", require("pug").__express);
app.set("view engine", "pug");

routes(app);

app.listen(port, () => {
  console.log(`App is running on port ${port}!`);
});
