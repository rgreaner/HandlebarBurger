var express = require("express");

var router = express.Router();

//Import model burger.js
var burger = require("../models/burger.js");

//Get all the data and post it on screen at the "/" route
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

//Post a new burger to the api DB--Name and Devoured Boolean
router.post("/api/burgers", function (req, res) {
    burger.insertOne([
        "burger_name"
    ],
        [
            req.body.burger_name, req.body.devoured
        ], function (result) {
            res.json({ id: result.insertId });
        });
});

//Update the burger at id=? Based on if it was devoured or not
router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition: ", condition);
    console.log("add a consolelog", req.body.devoured);
    // req.body.devoured = !req.body.devoured;
    if (req.body.devoured == 1) {
        req.body.devoured = 0
    }
    else {
        req.body.devoured = 1
    };
    console.log("add another consolelog", req.body.devoured)
    burger.updateOne("burgers",
        req.body.devoured
        ,
        req.params.id, function (result) {
            console.log(result);
            if (result.changedRows == 0) {
                return res.status(404).end(); //If there is no ID, send a 404 error
            } else { //If the ID was found, send success status
                res.status(200).end();
            }
        });
});

//Export routes to server.js
module.exports = router;