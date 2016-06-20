'use strict';

module.exports = function (app, db) {
  app.route("/")
    .get(function (req, res) {
       res.sendFile(process.cwd() + "/public/index.html"); 
    });
    
    
    app.route("/new")
        .get(function (req, res) {
           res.send("ERROR: No URL supplied after '/new/'"); 
        });
    
    app.route("/new/:URL") 
        .get(function (req, res) {
           res.send("Please supply a valid site and/or protocol");
        });
        
        
     app.route("/new/http://:URL(*)") 
        .get(function (req, res) {
           var url = req.params.URL;
           var num = db.collection("num");
           num.find({_id: 1}, {siteNum: 1}).toArray(function (err, docs) {
               if (err) throw err; 
               if (docs.length === 0) {
                     num.insert({_id: 1, siteNum: 1});
                     var obj = {original_url: "http://" + url, short_url: ""};
                     obj["short_url"] = "https://urlshortener-bartowski20.c9users.io/1";
                     res.send(JSON.stringify(obj));
                     var sites = db.collection("sites");
                     sites.insert({"short": 1, "real": "http://" + url});
                     db.close();
               }
               else {
                  console.log(docs);
                  num.update({_id: 1}, {$inc: {siteNum: 1}}); 
                  var obj = {original_url: "http://" + url, short_url: ""};
                  obj["short_url"] = "https://urlshortener-bartowski20.c9users.io/" + docs[0]["siteNum"];
                  res.send(JSON.stringify(obj));
                  var sites = db.collection("sites");
                  sites.insert({"short": parseInt(docs[0]["siteNum"], 10), "real": "http://" + url});
               } 
            });
        });
        
        
     app.route("/new/https://:URL(*)") 
        .get(function (req, res) {
           var url = req.params.URL;
           var num = db.collection("num");
            num.find({_id: 1}, {siteNum: 1}).toArray(function (err, docs) {
               if (err) throw err; 
               if (docs.length === 0) {
                     num.insert({_id: 1, siteNum: 1});
                     var obj = {original_url: "https://" + url, short_url: ""};
                     obj["short_url"] = "https://urlshortener-bartowski20.c9users.io/1";
                     res.send(JSON.stringify(obj));
                     var sites = db.collection("sites");
                     sites.insert({"short": 1, "real": "https://" + url});
                     db.close();
               }
               else {
                  console.log(docs);
                  num.update({_id: 1}, {$inc: {siteNum: 1}}); 
                  var obj = {original_url: "https://" + url, short_url: ""};
                  obj["short_url"] = "https://urlshortener-bartowski20.c9users.io/" + docs[0]["siteNum"];
                  res.send(JSON.stringify(obj));
                  var sites = db.collection("sites");
                  sites.insert({"short": parseInt(docs[0]["siteNum"], 10), "real": "https://" + url});
               } 
            });
        });
        
        
    app.route("/:NUM") 
        .get(function (req, res) {
           var sites = db.collection("sites");
           console.log(req.params.NUM);
           sites.find({"short": parseInt(req.params.NUM, 10)}).toArray(function (err, docs) {
              if (err) throw err;
              console.log(docs[0]["real"]);
              res.redirect(docs[0]["real"]);
              res.end();
           });
        });
};