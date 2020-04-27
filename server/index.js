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
            star_1: 0,
            star_2: 0,
            star_3: 0,
            star_4: 0,
            star_5: 0,
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
    if (request.query.name != null) {
        database.collection("uploads").find( { user: request.query.name })
        .sort({ date: -1 })
        .toArray(function(err, documents) {
            response.json(documents);
        });
    } else {
        database.collection("uploads").find( { user: request.user.username })
        .sort({ date: -1 })
        .toArray(function(err, documents) {
            response.json(documents);
        });
    }
});

app.get("/delete", vjmServer.jwtProtector, function(request, response) {
    database.collection("uploads").deleteOne( { image: request.query.photo }, function(err, obj) {
    if (err) throw err; });
    response.sendStatus(200);
});

app.get("/test_rate", vjmServer.jwtProtector, function(request, response) {
    database.collection("rating").find( { image: request.query.image } )
    .toArray(function(err, documents) {
        response.json(documents);
    });
});

app.get("/rate", vjmServer.jwtProtector, function(request, response) {
    if (request.query.number == 1) {
        database.collection("uploads").find( { image: request.query.image })
        .toArray(function(err, documents) {
        database.collection("uploads")
        .updateOne({ image: request.query.image }, 
            { $set: {star_1: Number(documents[0].star_1) + 1 } }, 
            function(err, res) {  if (err) throw err; });
        });
    }
    if (request.query.number == 2) {
        database.collection("uploads").find( { image: request.query.image })
        .toArray(function(err, documents) {
        database.collection("uploads")
        .updateOne({ image: request.query.image }, 
            { $set: {star_2: Number(documents[0].star_2) + 1 } }, 
            function(err, res) {  if (err) throw err; });
        });
    } 
    if (request.query.number == 3) {
        database.collection("uploads").find( { image: request.query.image })
        .toArray(function(err, documents) {
        database.collection("uploads")
        .updateOne({ image: request.query.image }, 
            { $set: {star_3: Number(documents[0].star_3) + 1 } }, 
            function(err, res) {  if (err) throw err; });
        });
    }
    if (request.query.number == 4) {
        database.collection("uploads").find( { image: request.query.image })
        .toArray(function(err, documents) {
        database.collection("uploads")
        .updateOne({ image: request.query.image }, 
            { $set: {star_4: Number(documents[0].star_4) + 1 } }, 
            function(err, res) {  if (err) throw err; });
        });
    }
    if (request.query.number == 5) {
        database.collection("uploads").find( { image: request.query.image })
        .toArray(function(err, documents) {
        database.collection("uploads")
        .updateOne({ image: request.query.image }, 
            { $set: {star_5: Number(documents[0].star_5) + 1 } }, 
            function(err, res) {  if (err) throw err; });
        });
    }

    database.collection("rating").insert({
        user: request.user.username,
        image: request.query.image,
        rate: request.query.number
    });

    response.sendStatus(200);

});

app.get("/complain", vjmServer.jwtProtector, function(request, response) {
    database.collection("uploads").updateOne({ image: request.query.image }, 
        { $set: { complain: 1 } }, 
        function(err, res) {  if (err) throw err; });
    response.sendStatus(200);
});

app.get("/is_moderator", vjmServer.jwtProtector, function(request, response) {
    database.collection("users").find( { username: request.user.username }).toArray(function(err, documents) {
        response.json(documents);
    });
});

app.get("/moderation", vjmServer.jwtProtector, function(request, response) {
    database.collection("uploads").find( { complain: 1 })
    .sort({ date: -1 })
    .toArray(function(err, documents) {
        response.json(documents);
    });
});

app.get("/keep", vjmServer.jwtProtector, function(request, response) {
    database.collection("uploads").updateOne({ image: request.query.photo }, 
        { $set: { complain: 0 } }, 
        function(err, res) {  if (err) throw err; });
    response.sendStatus(200);
});

mongoClient.connect(mongoUrl, function(err, db) {
    if (err) console.log(err.stack);
    database = db;
    console.log("hi");
    app.listen(80);
});
