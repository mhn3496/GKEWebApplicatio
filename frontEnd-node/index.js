var express = require("express");
//var todo_db = require("./seed.js");
var bodyparser = require("body-parser")
var morgan = require("morgan")
var request = require('request');
var Client = require('node-rest-client').Client;
 
var client = new Client();


//console.log(todo_db);
var app = express();
app.use(morgan('dev'));
/*add todo, delete todo, get all todo , complete todo(modifying)*/
app.use("/",bodyparser.urlencoded({extended:false}))
// HomeWork : RESTful APIs
//get all todo
//http://localhost:4000/todos/GET
// api part of server
const url = 'http://10.3.248.120:80/api/user';//'35.239.105.30:80'
app.get("/api/user",function (req,res) {

    
    //res.redirect(307,url);
    request.get(url, (error, response, body) => {
    if(error) {
        console.log(error);
    }
    console.log("loading from remote server")
    console.log("\n\n\n\n\n");
    console.log(body);
    console.log("\n\n\n\n");
    //console.dir(JSON.parse(body));
    res.json(JSON.parse(body));
});
});
app.post("/api/user",function (req,res) {
    console.log("making a post")
    request.post({
        "headers": { "content-type": "application/x-www-form-urlencoded" },
        "url": url,
        "body": JSON.stringify({
            "Name": req.body.Name,
            "Age": req.body.Age,
            "City":req.body.City
        })
        //"json":"true"
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        console.dir(JSON.parse(body));
        res.json(body);
})
});

//serve static assets in public directory
app.use("/",express.static(__dirname+"/public"));
app.use(morgan('dev'));
app.listen(8080);
