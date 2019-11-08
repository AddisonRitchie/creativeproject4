/*SERVER for Creative Project 4*/

var express = require('express');
var router = express.Router();
var request = require('request');
const fetch = require('node-fetch');

// var dataObject = new Object();
// dataObject.imageURL = "";
// dataObject.title = "";
// dataObject.hyperlink = "";

var dataObjectArray = [];
var metIDArray = [];
// var dataObject = new Object();


function imageClass() {

    this.imageURL = "";

    this.title = "";

    this.hyperlink = "";
}

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

//Connect to different servers to fetch images
router.get('/getArt', function(req, res, next) {
    console.log("In getArt route");



})

// function giphySearch(value) {
//     var dataObjectArray = [];

//     var searchUrl = "https://api.giphy.com/v1/gifs/search?api_key=Kbf2ic2QKeHTwi7zR5ODY7Kkjusi1hiB&q=" +
//         value + "&limit=25&offset=0&rating=G&lang=en";

//     // //Keys
//     // //Kbf2ic2QKeHTwi7zR5ODY7Kkjusi1hiB

//     // fetch(searchUrl)
//     // .then(response => response.json())

//     // .then(console.log);

//     console.log("In giphySearch");
//     fetch(searchUrl)
//         .then(response => response.json())
//         .then(giphyJSON => {
//             // console.log(giphyJSON);
//             // console.log(giphyJSON.data[0].images);


//             for (let i = 0; i < giphyJSON.data.length; i++) {
//                 // console.log("in for loop")

//                 var currentImages = giphyJSON.data[i];
//                 var dataObject = new Object();

//                 dataObject.imageURL = currentImages.images.fixed_height.url;
//                 //.fixed_height.url
//                 // console.log(dataObject.imageURL);

//                 dataObject.hyperlink = currentImages.url;
//                 // console.log(dataObject.hyperlink);

//                 dataObject.title = currentImages.title;
//                 // console.log(dataObject.title);

//                 dataObjectArray.push(dataObject);
//             }
//             console.log("data object array:");
//             console.log(dataObjectArray);

//             // let gottenImage = data[0].images;
//             // console.log(gottenImage);
//             // return(data);

//             // let gottenImage = data.find(data => data.images === "cat").id;
//             // return fetch(`https://maciejtreder.github.io/asynchronous-javascript/directors/${tarantinoId}/movies`);

//             return dataObjectArray;
//         })
//         // .then(response => response.json())
//         .then(console.log);

//     return Promise.all(dataObjectArray);
// }

function iconSearch(value) {
    var searchUrl = "https://search.icons8.com/api/iconsets/v4/search?term=" +
        value + "&amount=50&offset=0&platform=all&language=en-US&token=al05i21yfatb4s5eac20c4wr4394b1z2";

    var newIconArray = [];

    fetch(searchUrl)
        .then(response => response.json())
        .then(iconJSON => {
            console.log(iconJSON);

            var maxObjects = 25;
            var iconSize = 200;

            if (iconJSON.total < maxObjects) {
                maxObjects = iconJSON.total;
            }

            for (let i = 0; i < maxObjects; i++) {
                // console.log("in icon for loop")

                var iconObject = iconJSON.icons[i];
                var iconArtDetail = new imageClass();

                iconArtDetail.imageURL = "https://img.icons8.com/" + iconObject.platform + "/" +
                    iconObject.commonName + "/" + iconSize;
                // console.log(iconArtDetail.imageURL);

                iconArtDetail.title = iconObject.platform + " " + iconObject.commonName;
                // console.log(iconArtDetail.title);

                iconArtDetail.hyperlink = iconArtDetail.imageURL;

                newIconArray.push(iconArtDetail);
            }
            console.log("new icon array:");
            console.log(newIconArray);

            return newIconArray;

        })
    return Promise.all(newIconArray);

}

//Randomizer
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//Create a route for the getcity service
router.get('/getcity', function(req, res, next) {
    console.log("In getcity route");

    dataObjectArray = [];
    // giphySearch(req.query.q);


    // var dataObjectArray = [];

    var searchUrl = "https://api.giphy.com/v1/gifs/search?api_key=Kbf2ic2QKeHTwi7zR5ODY7Kkjusi1hiB&q=" +
        req.query.q + "&limit=25&offset=0&rating=G&lang=en";

    // //Keys
    // //Kbf2ic2QKeHTwi7zR5ODY7Kkjusi1hiB

    // fetch(searchUrl)
    // .then(response => response.json())

    // .then(console.log);

    // console.log("In giphySearch");
    fetch(searchUrl)
        .then(response => response.json())
        .then(giphyJSON => {
            console.log(giphyJSON);
            console.log(giphyJSON.data[0].images);


            for (let i = 0; i < giphyJSON.data.length; i++) {
                console.log("in for loop")

                var currentImages = giphyJSON.data[i];
                var dataObject = new imageClass();

                dataObject.imageURL = currentImages.images.fixed_height.url;
                //.fixed_height.url
                console.log(dataObject.imageURL);

                dataObject.hyperlink = currentImages.url;
                console.log(dataObject.hyperlink);

                dataObject.title = currentImages.title;
                console.log(dataObject.title);

                dataObjectArray.push(dataObject);
            }
            console.log("data object array:");
            console.log(dataObjectArray);

            // let gottenImage = data[0].images;
            // console.log(gottenImage);
            // return(data);

            // let gottenImage = data.find(data => data.images === "cat").id;
            // return fetch(`https://maciejtreder.github.io/asynchronous-javascript/directors/${tarantinoId}/movies`);

            // return dataObjectArray;

        })
        .then(metSearch => {
            var metSearchUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=" + req.query.q;

            fetch(metSearchUrl)
                .then(response => response.json())
                .then(metJSON => {
                    console.log("MET Json:" + metJSON);
                    var maxObjects = 25;
                    if (metJSON.total < maxObjects) {
                        maxObjects = metJSON.total;
                    }

                    for (let i = 0; i < maxObjects; i++) {
                        // metIDArray.push(metJSON.objectIDs[i]);

                        var idSearchUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" +
                            metJSON.objectIDs[i];

                        fetch(idSearchUrl)
                            .then(response => response.json())
                            .then(metArtDetailJson => {
                                var metDetailObject = new imageClass();

                                metDetailObject.title = metArtDetailJson.title;

                                metDetailObject.imageURL = metArtDetailJson.primaryImageSmall;

                                metDetailObject.hyperlink = metArtDetailJson.objectURL;

                                dataObjectArray.push(metDetailObject);
                            })
                            .then(console.log("End of Met For Loop"))
                            .then(ignoreme => {
                                if(i==maxObjects-1) {
                                    shuffleArray(dataObjectArray);

                                // return dataObjectArray;

                                var jsonresult = dataObjectArray;

                                // console.log("json result" + jsonresult);
                                // console.log("Data json dataObject:" + dataObjectArray);

                                res.status(200).json(jsonresult);
                                return Promise.all(dataObjectArray);
                                }
                                
                            })
                    }


                })

                .then(console.log("After met fetch"))

            // .then(metObjectIds => {
            //     var maxObjects = 25;
            //     if(metObjectIds.total < maxObjects) {
            //         maxObjects = metObjectIds.total;
            //     }

            //     for(let i=0; i<metObjectIds.total; i++) {
            //         var variableObjectID = metObjectIds.objectIDs[i];

            //         var objectIdSearchURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" 
            //         + variableObjectID ;
            //         // fetch(objectIdSearchURL)
            //     }

            // })
            // .then(return dataObjectArray)
        })
        // .then(response => response.json())
        // .then(console.log)
        // .then(iconSearch(req.query.q))
        .then(iconSearch => {
            var iconSearchUrl = "https://search.icons8.com/api/iconsets/v4/search?term=" +
                req.query.q + "&amount=50&offset=0&platform=all&language=en-US&token=al05i21yfatb4s5eac20c4wr4394b1z2";

            // var newIconArray =[];

            fetch(iconSearchUrl)
                .then(response => response.json())
                .then(iconJSON => {
                    // console.log(iconJSON);

                    var maxObjects = 25;
                    var iconSize = 200;

                    if (iconJSON.total < maxObjects) {
                        maxObjects = iconJSON.total;
                    }

                    for (let i = 0; i < maxObjects; i++) {
                        // console.log("in icon for loop")

                        var iconObject = iconJSON.icons[i];
                        var iconArtDetail = new imageClass();

                        iconArtDetail.imageURL = "https://img.icons8.com/" + iconObject.platform + "/" +
                            iconObject.commonName + "/" + iconSize;
                        // console.log(iconArtDetail.imageURL);

                        iconArtDetail.title = iconObject.platform + " " + iconObject.commonName;
                        // console.log(iconArtDetail.title);

                        iconArtDetail.hyperlink = iconArtDetail.imageURL;

                        dataObjectArray.push(iconArtDetail);
                    }
                    console.log("new icon array:");
                    console.log(dataObjectArray);

                    // shuffleArray(dataObjectArray);

                    // // return dataObjectArray;

                    // var jsonresult = dataObjectArray;

                    // // console.log("json result" + jsonresult);
                    // // console.log("Data json dataObject:" + dataObjectArray);

                    // res.status(200).json(jsonresult);
                    // return Promise.all(dataObjectArray);

                })
            // return Promise.all(dataObjectArray);
        })
    // .then(iconArray => {
    //     console.log("ICON ARRAY:" + iconArray);
    //     //Send JSON response back
    //     // var jsonresult = "";
    //     var jsonresult = dataObjectArray;

    //     console.log("json result" + jsonresult);
    //     console.log("Data json dataObject:" + dataObjectArray);

    //     res.status(200).json(jsonresult);

    //     return Promise.all(dataObjectArray);
    // })
    // .then(return Promise.all(dataObjectArray))

    // //         //Send JSON response back
    // var jsonresult = dataObjectArray;

    // res.status(200).json(jsonresult);


    // return Promise.all(dataObjectArray);



    // //Read the file to get the list of cities
    // var fs = require('fs');
    // fs.readFile(__dirname + '/cities.dat.txt', function(err, data) {
    //     if (err) throw err;

    //     var cities = data.toString().split("\n");
    //     for (var i = 0; i < cities.length; i++) {
    //         // console.log(cities[i]);
    //         var result = cities[i].search(myRe);
    //         if (result != -1) {
    //             // console.log(cities[i]);
    //         }
    //     }

    // //Send JSON response back
    // var jsonresult = dataObjectArray;

    // for (var i = 0; i < cities.length; i++) {
    //     var result = cities[i].search(myRe);
    //     if (result != -1) {
    //         // console.log(cities[i]);
    //         jsonresult.push({ city: cities[i] });
    //     }
    // }
    // res.status(200).json(jsonresult);
    //     console.log(jsonresult);
    // });

    // //Find the cities that have the prefix given in the URL
    // var myRe = new RegExp("^" + req.query.q);
    // console.log(myRe);



});

module.exports = router;
