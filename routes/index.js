/*SERVER for Creative Project 4*/

var express = require('express');
var router = express.Router();
var request = require('request');

var owlToken = "";

//maybe change to v3, pronounciation and (some) images available in newer version
//nvm need extra credintials for v3, sadness
var dictionary = "https://owlbot.info/api/v1/dictionary/balloon?format=json";

// var dictionary = "https://www.apple.com";
router.get('/getdictionary', function(req, res) {
    console.log("in dictionary");
    console.log(req.query.q);

    dictionary = "https://owlbot.info/api/v1/dictionary/" + req.query.q + "?format=json";

    // dictionary = dictionary + req;

    request(dictionary).pipe(res);

    // Send JSON response back
    var myjsonresult = res.toString;
    console.log("Json result: " + myjsonresult);

});

/* GET home page. */
router.get('/', function(req, res, next) {
    //   res.render('index', { title: 'Express' });
    res.sendFile('index.html', { root: 'public' });
});

//Create a route for the getcity service
router.get('/getcity', function(req, res, next) {
    console.log("In getcity route");

    //Read the file to get the list of cities
    var fs = require('fs');
    fs.readFile(__dirname + '/cities.dat.txt', function(err, data) {
        if (err) throw err;

        var cities = data.toString().split("\n");
        for (var i = 0; i < cities.length; i++) {
            // console.log(cities[i]);
            var result = cities[i].search(myRe);
            if (result != -1) {
                // console.log(cities[i]);
            }
        }

        //Send JSON response back
        var jsonresult = [];
        for (var i = 0; i < cities.length; i++) {
            var result = cities[i].search(myRe);
            if (result != -1) {
                // console.log(cities[i]);
                jsonresult.push({ city: cities[i] });
            }
        }
        res.status(200).json(jsonresult);
        console.log(jsonresult);
    });

    //Find the cities that have the prefix given in the URL
    var myRe = new RegExp("^" + req.query.q);
    console.log(myRe);



});

module.exports = router;
