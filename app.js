require("dotenv").config();

const express = require("express");
const app = express();

const helmet = require("helmet");
var cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

const static = express.static(__dirname + "/public");
const routes = require("./routes");

// serve static assets
// app.use(express.static("public"));
app.use("/public", static);
// security
app.use(helmet());

// use session storage to store cues
app.use(
  cookieSession({
    name: "session",
    // used for encryption, but not really important in this context, so ill just
    // put it here since it's required.
    secret: "secret",
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

// Use body parser to obtain user search query
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: false }));

// Set pug as our template engine
app.engine("pug", require("pug").__express);
app.set("view engine", "pug");

routes(app);

app.listen(3000, () => {
  console.log("App is running on localhost:3000!");
});
