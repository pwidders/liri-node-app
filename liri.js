require("dotenv").config();
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer");
var request = require('request');

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
            mainMenu();
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
// * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
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
            message: "Please enter the name of the song your looking for:",
            name: "userSong"
          }
        ])
        .then(function (userChoice) {
            spotify.search({ type: 'track', query: userChoice.userSong })
                .then(function (response) {
                    var resultObjects = response.tracks.items;
                    // Empty array to hold objects before printing to console
                    var trackResults = [];
                        // for loop to iterate through results
                        for (i = 0; i < resultObjects.length; i++) {
                        //console.log(resultObjects[i].album.name);
                        // create a new object
                        var track = new Object();
                        track.artist = resultObjects[i].artists.name;
                        track.song = resultObjects[i].name;
                        track.previewLink = resultObjects[i].preview_url;
                        track.album = resultObjects[i].album.name;
                        // push that object into trackResults array
                        trackResults.push(track);
                        }
                    // Console log search results
                    console.log(trackResults);
                })
        })
    mainMenu();
    }

            
        
    
       


// Concert-this: `node liri.js concert-this <artist/band name here>`
// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

    //    * Name of the venue
    //    * Venue location
    //    * Date of the Event (use moment to format this as "MM/DD/YYYY")

    // function concertIt() {
    //     // Prompt user for input
    //     inquirer.prompt([
    //         {
    //           type: "input",
    //           message: "Please enter the group/artist:",
    //           name: "userGroup"
    //         }
    //     ]).then (function(userBand) {
    //         var artistInfo = [];
    //         var artist = userBand.userGroup;
    //         request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
    //         var parsedBody = JSON.parse(body);
    //         for (i=0; i < parsedBody.length; i++) {
    //             // pull object's information needed
    //             console.log(parsedBody[i]);
    //         }
    //         console.log('error:', error); // Print the error if one occurred
    //         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //         // console.log('body:', body); // Print the HTML for the Google homepage.
    //         });
    //     })
    // 