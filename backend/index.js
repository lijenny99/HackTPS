const express = require("express");
const http = require('http');
const port = process.env.PORT || 80;
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const authenticate = require('./libs/auth');
const socket = require('./libs/socket');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => console.log(`Listening at ${port}`));
app.use(authenticate);

app.get("/", (req, res) => {
    res.send("Hello");

});
