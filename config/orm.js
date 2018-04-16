// Import (require) connection.js into orm.js
var connection = require("../config/connection.js");

// In the orm.js file, create the methods that will execute the necessary MySQL commands in the controllers. 

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (California Burger => 'California Burger')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'California Burger'} => ["name='California Burger'"]
            // e.g. {Devoured: true} => ["Devoured=true"]
            arr.push(key + "=" + value);
        }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

//These are the methods you will need to use in order to retrieve and store data in your database.
// selectAll()
// insertOne()
// updateOne()

var orm = {
    //Grab all information from the DB's burgers table and callback the result
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    //Insert the user's input into burgers table
    insertOne: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table; //Create queryString

        queryString += " (";                                 //add a ( to queryString
        queryString += cols.toString();                     //Make the cols array a string, then add it to the queryString
        queryString += ") ";                               //add closing ) to queryString
        queryString += "VALUES (";                        //add VALUES ( to queryString
        queryString += "?"; 
        queryString += ") ";                            //Final ) added to queryString

        console.log(queryString);                     //See what is forming the queryString variable

        connection.query(queryString, vals, function (err, result) { 
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    updateOne: function (table, objColVals, condition, cb) {
        console.log("before:",objColVals);
       if (objColVals == true) {
           objColVals = 1
       }
       else {
           objColVals = 0
       };
       console.log("after:",objColVals);
        var queryString = "UPDATE " + table;
        
        queryString += " SET devoured = ";                         //add SET to queryString
        queryString += objColVals;           //add objToSql function, above, with objColVals array being passed in the parameters
        queryString += " WHERE id = ";                     //add "WHERE"
        queryString += condition;                    //add the condition...is the burger being devoured or not? 

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);                                     //This cb function is calling "result" of the query function, then "cb" is being called as updateOne function's last parameter
        });
    }
};

// Export the ORM object in module.exports.
module.exports = orm;