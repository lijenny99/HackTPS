const mongoose = require('mongoose');
const passport = require('passport');
const passport_mongoose = require('passport-local-mongoose');
const express = require('express');
const express_session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require('body-parser');
const cors = require("cors");

const router = express.Router();

const mongo_url = "mongodb://hacktpstest:hacktps@ds239940.mlab.com:39940/hacktps";

const User = require("./schema.js");

mongoose.connect(mongo_url, (err, db) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully Connected");
    }

});


router.use(express_session({
    secret: "somesecret",
    resave: false,
    saveUninitialized: true
}));

router.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.Username = User.username;
    next();
})

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


router.post("/register", (req, res) => {
    let info = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    };

    User.register(new User(info), req.body.password, (err, account) => {
        if (err) {
            res.send("Failed to register");
            return console.log(`Failed to register ${account}`);
        }

        passport.authenticate('local')(req, res, () => {
            res.send("Registered!");
            return console.log(`Registered ${account}`);
        })

    })
})

router.post("/login", (req, res) => {
    console.log("/login post");
    console.log(req);
    passport.authenticate("local")(req, res, () => {
        console.log("Authenticated");
        console.log(req);
        res.send(JSON.stringify({ data: req.user, statusCode: 200 }));
    })
});

module.exports = router;