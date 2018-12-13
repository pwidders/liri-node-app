require("dotenv").config();
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer");
var request = require("request"); 
var fs = require("fs");
var moment = require('moment');

// Add the code required to import the `keys.js` file and store it in a variable.

var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);

// Make it so liri.js can take in one of the following commands:
    //    * `concert-this`
    //    * `movie-this`
    //    * `do-what-it-says`
    //    * 'spotify-this-song'

    // define a function that displays the main menu
    function mainMenu() {
    // prompt the user to choose between three options
    inquirer.prompt([
        {
        type: "list",
        name: "menuChoice",
        message: "Hi! Welcome to LiriBot. What would you like to do?",
        choices: ['spotify-this-song', 'concert-this', 'movie-this', 'do-what-it-says']
        }
    ]).then(function (userChoice) {
        // depending on the user selection, 
        switch (userChoice.menuChoice) {
        // call on a function to call spotify API
        case 'spotify-this-song':
            spotifyIt();
            break;
        // call on concert-this function
        case "concert-this":
            concertIt();
            break;
        // call on movie-this function
        case "movie-this":
            movieIt();
            break;
        case "do-what-it-says":
            doIt();
            break;
        }
    })
    }   

mainMenu();


// * `spotify-this-song`
// * Utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
// * Navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
    
    //* This will show the following information about the song in your terminal/bash window
    //    * Artist(s)
    //    * The song's name
    //    * A preview link of the song from Spotify
    //    * The album that the song is from
    //    * If no song is provided then your program will default to "The Sign" by Ace of Base.

    function spotifyIt() {
        // Prompt user for input
        inquirer.prompt([
          {
            type: "input",
            message: "Please enter only the song title your looking for:",
            name: "userSong"
          }
        ])
        .then(function (userChoice) {
            spotify.search({ type: 'track', query: userChoice.userSong })
                .then(function (response, err) {
                    var resultObjects = response.tracks.items;
                    // test API- console.log("\n",resultObjects[0].album.artists[0].name,"\n");
                    // Empty array to hold objects before printing to console
                    var trackResults = [];
                        // for loop to iterate through results
                        for (i = 0; i < resultObjects.length; i++) {
                        // create a new object
                        var track = new Object();
                        track.artist = resultObjects[i].album.artists[0].name;
                        track.song = resultObjects[i].name;
                        track.previewLink = resultObjects[i].preview_url;
                        track.album = resultObjects[i].album.name;
                        // push that object into trackResults array
                        trackResults.push(track);
                        }
                    // Console log search results
                    console.log(trackResults);
                    //Console log any errors
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }
                })
        })
    }

// Concert-this: `node liri.js concert-this <artist/band name here>`
// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

    //    * Name of the venue
    //    * Venue location
    //    * Date of the Event (use moment to format this as "MM/DD/YYYY")

    function concertIt() {
        // Prompt user for input
        inquirer.prompt([
            {
              type: "input",
              message: "Please enter the group/artist you wish to see. A blank '[]' means there's no live shows planned:",
              name: "userGroup"
            }
        ])
        .then(function (userChoice) {
            var artist = userChoice.userGroup;
            request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
                //console.log('error:', error); // Print the error if one occurred
                //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                var parsedBody = JSON.parse(body);
                // empty array to hold data to be consoled
                var showtimes = [];
                    // for loop to iterate through the response array
                    for (i = 0; i < parsedBody.length; i++) {
                        // console.log(parsedBody[i].venue);
                        // create a new object
                        var showListing = new Object();
                        showListing.venue = parsedBody[i].venue.name;
                        showListing.country = parsedBody[i].venue.country;
                        showListing.region = parsedBody[i].venue.region;
                        showListing.city = parsedBody[i].venue.city;
                        showListing.venueDate = parsedBody[i].datetime;
                        
                        // convert response date to MM/DD/YYYY // <-------Do this
                        // var venueDate = parsedBody[i].datetime;
                        // (venueDate).format('MM/DD/YYYY');
                        // console.log(venueDate);
                        
                        // push showListing object into showtimes array
                        showtimes.push(showListing);
                        console.log(showListing);
                    }
            })
        })
    }
            
// Movie-this: node liri.js movie-this '<movie name here>'
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// This will output the following information:
    //  * Title of the movie.
    //  * Year the movie came out.
    //  * IMDB Rating of the movie.
    //  * Rotten Tomatoes Rating of the movie.
    //  * Country where the movie was produced.
    //  * Language of the movie.
    //  * Plot of the movie.
    //  * Actors in the movie.

    function movieIt() {
        // Prompt user for input
        inquirer.prompt([
            {
              type: "input",
              message: "Please enter the movie you're looking for:",
              name: "userMovie"
            }
        ])
        .then(function (userChoice) {
            var movie = userChoice.userMovie;
            request("http://www.omdbapi.com/?apikey=trilogy&t=" + movie, function (error, response, body) {
                // console.log('error:', error); // Print the error if one occurred
                // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                var parsedBody = JSON.parse(body);
                // console.log(parsedBody.Ratings[1].Value); 
                // Empty array to hold the search results
                var movieArray = [];
                // create a new object
                var movieInfo = new Object();
                movieInfo.title = parsedBody.Title;
                movieInfo.year = parsedBody.Year;
                movieInfo.imdbRating = parsedBody.imdbRating;
                movieInfo.rottenTomatoes = parsedBody.Ratings[1].Value;
                movieInfo.country = parsedBody.Country;
                movieInfo.language = parsedBody.Language;
                movieInfo.plot = parsedBody.Plot;
                movieInfo.actors = parsedBody.Actors;
                // push showListing object into showtimes array
                movieArray.push(movieInfo);
                console.log(movieArray);
            });
        });
    }

// Do what it says: node liri.js do-what-it-says
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

    function doIt() {
        var randomText = fs.readFileSync
        ('random.txt', 'utf8');
        console.log(randomText);
        
        // function (userChoice) {
        //     spotify.search({ type: 'track', query: userChoice.userSong })
        //         .then(function (response, err) {
        //             var resultObjects = response.tracks.items;
        //             // Empty array to hold objects before printing to console
        //             var trackResults = [];
        //                 // for loop to iterate through results
        //                 for (i = 0; i < resultObjects.length; i++) {
        //                 //console.log(resultObjects[i].album.name);
        //                 // create a new object
        //                 var track = new Object();
        //                 track.artist = resultObjects[i].album.artists[0].name;
        //                 track.song = resultObjects[i].name;
        //                 track.previewLink = resultObjects[i].preview_url;
        //                 track.album = resultObjects[i].album.name;
        //                 // push that object into trackResults array
        //                 trackResults.push(track);
        //                 }
        //             // Console log search results
        //             console.log(trackResults);
        //             //Console log any errors
        //             if (err) {
        //                 return console.log('Error occurred: ' + err);
        //             }
        //         })
        // }
    }
