const express = require("express");
const http = require('http');
const port = process.env.PORT || 80;
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const authenticate = require('./auth');
const server = require("http").createServer(app);
const crypto = require("crypto");
const io = require('socket.io');


const socket = new io(server, {
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
server.listen(port, () => console.log(`Listening at ${port}`));
app.use(authenticate);

app.get("/", (req, res) => {
    res.send("Hello");

});

app.post("/form", (req, res) => {


    res.send({
        statusCode: 200,
        body: "Form Received",
    })

    //debug

    console.log(req);
}
);



module.exports = socket;