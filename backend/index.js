const express = require("express");
const http = require('http');

const port = process.env.port || 3000;
const app = express();

const authenticate = require('./libs/authenticate.js');


app.listen(port, () => console.log(`Listening at ${port}`));
app.use(authenticate);

