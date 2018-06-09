const express = require("express");
const http = require('http');
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const authenticate = require('./libs/authenticate.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => console.log(`Listening at ${port}`));
app.use(authenticate);

app.get("/", (req, res) => {
    res.send("Hello");

});
