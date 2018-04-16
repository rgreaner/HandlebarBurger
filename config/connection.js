// Inside the connection.js file, setup the code to connect Node to MySQL.
// Export the connection.
var mysql = require("mysql");

//set up connection
var connection = mysql.createConnection({
    port: 8889,
    host: "localhost",
    user: "root",
    password: "root",
    database: "burgers_db"
});

//connect to database
connection.connect(function (err) {
    if (err) {
        console.log("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id: " + connection.threadId);
});

//export connection to orm.js
module.exports = connection;