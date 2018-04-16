var orm = require("../config/orm.js");

//Also inside burger.js, create the code that will call the ORM functions using burger specific input for the ORM.

var burger = {
    //Grab all burgers from DB & run selectAll orm function
    selectAll: function (cb) {
        orm.selectAll("burgers", function(res){
            cb(res);
        });
    },
    //Add Burger to DB via ORM insertOne function
        //cols & vals paramaters(variables) are arrays
    insertOne: function (cols, vals, cb) {
        orm.insertOne ("burgers", cols, vals, function(res) {
            cb(res);
        });
    },
    //Update DB via ORM updateOne function
    updateOne: function(table, objColVals, condition, cb) {
        console.log(objColVals, condition);
        orm.updateOne("burgers", objColVals, condition, function(res){
            cb(res);
        });
    }
};

//Export ORM functions to burgers_controller,js
module.exports = burger;