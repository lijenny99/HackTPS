const io = require('socket.io')({
    path: '/api',
    serveClient: false
});
const cors = require("cors");
const server = require("http").createServer();

let session_id;

io.attach(server, {

});

io.on("connection", socket => {
    session_id = socket.id;
    console.log(`New client connected with session ID ${session_id}`);

    socket.on("message", (data) => {
        let time_stamp = Date.now();


    })

    socket.on("disconnect", () => console.log(`${session_id} disconnected`));
});
