# liri-node-app
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface made for the command line. LIRI is a command line node app that takes in parameters and gives you back data. It's four functions include :
    1) 'Spotify this song'
    2) 'Movie this film'
    3) 'Concert this band/artist'
    4) 'Do what it says'

## Getting Started & Prerequisites

Liri-bot is a command line interface app. I ran it using node.js. The following instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

// API Sources

Spotify: 

- You will need the node-spotify-api package in order for Liri-bot to retrieve song information from the Spotify API. 

    - 'Spotify this' will show a song's:
        * Artist(s)
        * The song's name
        * A preview link of the song from Spotify
        * The album that the song is from

OMDB: The bot uses the request npm to search OMDB's API. Here is documentation on attaining a key and searching http://www.omdbapi.com/

    - The following information will be displayed when a user enters a movie title:
        * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Rotten Tomatoes Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie.

Bands in Town: The bot uses the request npm to search Bands in Town's API. 

    - The following information will be displayed when a user enters a movie title:
        * Name of the venue
        * Venue location
        * Date of the Event 

// Required Node modules:

Inquire (NPM): This module is used to prompt user and gather input.

Moment (NPM): This module is used for time conversions.

DotEnv (NPM): Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

Request (NPM) : You'll use Request to grab data from the OMDB API and the Bands In Town API.


### Installing

All files are needed to run this application.

// Modules

Inquire: https://www.npmjs.com/package/inquirer

Request: https://www.npmjs.com/package/request

DotEnv: https://www.npmjs.com/package/dotenv

Spotify: Please visit https://www.npmjs.com/package/node-spotify-api for instructions on how to download the npm and search documentation.

// If you plan to build your own bot, you will need your own API keys.

Spotify: The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:

    Step One: Visit https://developer.spotify.com/my-applications/#!/
    
    Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
    
    Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
    
    Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.


Bands in town: https://manager.bandsintown.com/support/bandsintown-api

OMDB: http://www.omdbapi.com/


## Running the tests

I performed all testing and running of this application through the command line.


## Built With

Javascript- Visual Studio 
Additional modules mentioned above
Command prompt- Git Bash
Node.js

## Versioning

Current version 1

## Author
The work was performed solely by Pete Widders

## License

This project is not under license

## Acknowledgments

I'd like to thank the my faculty and tutor Vivian L for helping me get this application off the ground. It was a very informative process and it taught me a lot about API's, Node, Javascript and just the all around process of building an application.
