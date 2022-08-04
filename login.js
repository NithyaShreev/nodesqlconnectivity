const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");
const encoder = bodyparser.urlencoded();
const app = express();
//app.use("/assets",express.static("assets"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "nithya2002",
    database: "login"
});
//connection to database
connection.connect(function (error) {
    if (error) throw error
    else console.log("connected successfully!")
})

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})
app.post("/", encoder, function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from user where username = ? and password = ?", [username, password], function (error, results, fields) {
        if (results.length > 0) {
            res.redirect("/welcome");
        } else {
            res.redirect("/");
        }
        res.end();
    })
})

app.get("/welcome", function (req, res) {
    res.sendFile(__dirname + "/welcome.html")
})

app.listen(4800);


