require("dotenv").config();
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer");


function spotifyIt() {
    // Prompt user for input
    inquirer.prompt([
        {
          type: "input",
          message: "Please enter the name of the song your looking for:",
          name: "userSong"
        }
        ]).then (function(userChoice) {
            spotify.search({ type: 'track', query: userChoice.userSong })
            .then(function(response) {
            console.log(response.tracks.items);
              
            })
          
            // .catch(function(err) {
            // console.log(err);
            // });
        })
    };