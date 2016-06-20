'use strict';

var express = require("express");
var routes = require("./app/routes/index.js");
var mongo = require("mongodb").MongoClient;
var app = express();

mongo.connect("mongodb://localhost:27017/clementinejs", function(err, db) {
   if (err) throw err; 
   console.log("Mongo connected on port 27017...");
   
   app.use("/public", express.static(process.cwd() + "/public"));

   routes(app, db);

   app.listen(8080, function () {
      console.log("Listening on port 8080..."); 
   });
   
});

