const firebase = require('./firebase');
const auth = firebase.auth();
const express = require('express');
const express_session = require("express-session");
const bodyParser = require('body-parser');
const cors = require("cors");

const router = express.Router();

router.use(express_session({
    secret: "somesecret",
    resave: false,
    saveUninitialized: true
}));

router.post('/register', (req, res) => {
    let info = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    };
    console.log(info);


    auth.createUserWithEmailAndPassword(info.email, info.password)
        .then(() => {
            res.send(`Registered`);
        })
        .catch((err) => {
            console.log(err);
            res.send(`Error with ${err}.`);
        });


})

router.post('/login', (req, res) => {
    let info = {
        email: req.body.email,
        password: req.body.password
    };
    auth.signInWithEmailAndPassword(info.email, info.password)
        .then(() => {
            console.log(`Authenticated!`);
            res.send(JSON.stringify({ statusCode: 200 }));
        })
        .catch((err) => {
            console.log(err);
            res.send(`Error with ${err}`);
        })
});

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
    }

});

module.exports = router;
