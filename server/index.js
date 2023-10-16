"use strict";

// Basic express setup:

const PORT          = 8081;
const express       = require("express");
const bodyParser = require("body-parser");
//an instance of Express.js application is stored in app
const app           = express();

//body parser library to convert request body from Buffer to string
app.use(bodyParser.urlencoded({ extended: true }));

//middleware used to serve static files from public directory
app.use(express.static("public"));

// The in-memory database of tweets. It's a basic object with an array in it.
const db = require("./lib/in-memory-db");
// db = {
// tweets: [array of objects]
// }

// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:
const DataHelpers = require("./lib/data-helpers.js")(db);
//const DataHelpers = require("./lib/data-helpers.js") 
//the above line is just the reference because we are not passing the argument i.e. db, so everytime we have to call DataHelpers() we would need to pass db as an argument i.e. DataHelpers(db)

// Update the dates for the initial tweets (data-files/initial-tweets.json).
require("./lib/date-adjust")();
//this would run on every request

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.
const tweetsRoutes = require("./routes/tweets")(DataHelpers);
//the above line is a function expression basically
//tweetsRoutes references to the router object returned from the function in ./routes/tweets file

// Mount the tweets routes at the "/tweets" path prefix:
app.use("/tweets", tweetsRoutes);
//the above line of code is telling the Express.js application to use the tweetsRoutes middleware for all routes that start with "/tweets".

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
