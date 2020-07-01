var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var database = require("./config/database");
var port = process.env.PORT || 8888;

// configuration =========
mongoose.connect(database.url); // connect to mongoDB

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// routes ======
require("./app/routes.js")(app);

app.listen(port);
console.log("App listening on port : " + port);
