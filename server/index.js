const express = require('express');
const vjm = require('vue-jwt-mongo');
const multer = require("multer");
const mongoClient = require('mongodb').MongoClient;

const mongoUrl = "mongodb://localhost/photofeed";
let app = express();

let vjmServer = vjm.Server({
    mongoUrl: mongoUrl,
    jwtSecret: "E9CB2C5BDD8A3319CCAC212C8D1914924B9D166069C3253E022D9E9FC37610DF"
});

let upload = multer({ dest: "../public/uploads" });
let database;

app.use(express.static("../client"));
app.use(express.static("../public"));

app.post("/auth/register", vjmServer.registerHandler);
app.post("/auth/login", vjmServer.loginHandler);

app.post("/upload", [vjmServer.jwtProtector, upload.single("image")],
    function(request, response) {
        database.collection("uploads").insert({
            user: request.user.username,
            image: request.file.filename,
            date: new Date()
        });
        response.sendStatus(200);
});

app.get("/feed", vjmServer.jwtProtector, function(request, response) {
    database.collection("uploads").find()
    .sort({ date: -1 })
    .limit(10)
    .toArray(function(err, documents) {
        response.json(documents);
    }); 
});

app.get("/myphoto", vjmServer.jwtProtector, function(request, response) {
    database.collection("uploads").find( { user: request.user.username })
    .sort({ date: -1 })
    .limit(10)
    .toArray(function(err, documents) {
        response.json(documents);
    });
});

app.get("/delete", vjmServer.jwtProtector, function(request, response) {
    console.log(request);
    database.collection("uploads").deleteOne( { image: request }, function(err, obj) {
    if (err) throw err;
  });
});

mongoClient.connect(mongoUrl, function(err, db) {
    if (err) console.log(err.stack);
    database = db;
    console.log("hi");
    app.listen(80);
});
