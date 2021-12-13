/********************* Requires *********************/
var express = require("express");
var app = express();

const { port, database, keys } = require("./config/settings");

const passport = require("passport");
const passportSetup = require("./config/passport-setup");

const cookieSession = require("cookie-session");
const mongoose = require("mongoose");

/***************** Including Routes *****************/
const router = require("./routers/router.js");
const auth = require("./routers/auth-routes.js");
const users = require("./routers/users.js");
const ownerPosts = require("./routers/ownerPosts");
const renterPosts = require("./routers/renterPosts");

/********************* Database *********************/
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/gfp", { useMongoClient: true });
// mongoose.connect(database.mongodb.uri, { useMongoClient: true });

// var items = require("../database-mongo");

/******************** Middleware ********************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../react-client/dist"));

// setting up the age of the cookie & the key to encrypt the cookie before sending it to the browser
app.use(
    cookieSession({
        // maxAge: 24 * 60 * 60 * 1000, // day in milliseconds
        maxAge: 10 * 1000, // 10 seconds in milliseconds
        keys: [keys.session.cookieKey],
    })
);


// initialize passport to avoid: TypeError: req.logIn is not a function
app.use(passport.initialize());
app.use(passport.session()); // important too if we want to make the passport.deserializeUser() execute the callback function

/********************** Routes **********************/

app.use("/auth", auth); // /auth/signin or /auth/signup
app.use("/users", users); // /users (CRUD) /users/:userId (RUD)
app.use("/api/ownerposts", ownerPosts); // /api/ownerposts (CRUD)
app.use("/api/renterposts", renterPosts); // /api/renterposts (CRUD)

/**** Middleware that Catch the "Wrong Endpoint" ****/

// Catch 404 errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

/************** Error handler function **************/
// Error handler function
app.use((err, req, res, next) => {
    const error = app.get("env") === "development" ? err : {};
    const status = err.status || 500;

    // respond to client
    res.status(status).json({
        error: {
            message: error.message,
        },
    });
    // Respond to ourselves
    console.error(err);
});


/**************** Listening Requests ****************/

app.listen(port, function () {
    console.log(`listening on port http://localhost:${port} !`);
});

