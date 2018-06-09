const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');
const passport_mongoose = require('passport-local-mongoose');
const express = require('express');
const express_session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

const router = express.Router();

const mongo_url = "mongodb+srv://hacktps:mcef16UYhq7dOF47@hacktps-8zdri.mongodb.net/test?retryWrites=true";

const User = require("./schema.js");

mongoose.connect(mongo_url);
router.use(passport.initialize());
router.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
    passport.authenticate("local", (err, user) => {
        console.log(`${user} authenticated`);
        if (!err) {
            res.send(JSON.stringify({ data: user._id, statusCode: 200 }))
        }
    })
})

module.exports = router;