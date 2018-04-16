var express = require ("express");
var bodyParser = require ("body-parser");

//Set up connection to server on host 8080
var PORT = process.env.PORT || 8080;

var app = express();
//Serves static content from "public" directory w/n repo folder
app.use(express.static("public"));

//Parses application /x-www-form-urlencoded...like in Postman
app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());

//Handlebars

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Import routes & let server access them
var routes = require("./controllers/burgers_controller.js");
app.use(routes);

//Start server---listen
app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + PORT);
});


