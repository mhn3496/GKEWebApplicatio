var express = require("express");
var userList = require("./userList.json");
var bodyparser = require("body-parser");
var morgan = require("morgan");


var app = express();
//app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: false }));

app.get("/api/user",function (req,res) {
   // res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(userList);

})

app.post("/api/user",function (req,res) {
    console.log("Request:::");
    console.log(req.body);
    var keys = Object.keys(req.body);
    respObj = JSON.parse(keys[0]);
    //var respObj = req.body;
    console.log(respObj);
    var username = respObj.Name;
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    console.log(username)

        if(username==""|| username.trim()=="")
        {
            res.send(400).json({error: "name can not be empty"});
        }
        else{
            var lastElement = userList.userList[userList.userList.length-1];
            var new_user_object = {
                Name : respObj.Name,
                Age : respObj.Age,
                City : respObj.City,
                ID : Number(lastElement.ID) + 1
            }
            userList.userList[userList.userList.length] = new_user_object;
            res.json(userList);
        }

})


//app.use(morgan('dev'));
app.listen(8080,"0.0.0.0");
