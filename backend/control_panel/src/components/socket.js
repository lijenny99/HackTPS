import openSocket from "socket.io-client";
const socket = openSocket('https://bravetheheat.heroku.com');

let current_room;

let user = {
    user_id: 'admin',
    client_id: null,
    socket_id: null,

}

socket.on("connect", () => {
    console.log(`Connected with id ${socket.id}`)
    user.client_id = socket.id;

})

function get_rooms(cb) {
    socket.on("open_sessions", (data) => {
        cb(data);
        console.log(`Open sessions: ${data}`);
    })

    socket.emit("get_rooms", socket.id);
    console.log(`Requested rooms`);
}

function join_room(session_id, cb) {
    let data = {
        client_id: user.client_id,
        user_id: user.user_id,
        client_id: socket.id,
        session_id: session_id
    };
    user.session_id = session_id;

    socket.emit("join_room", data);
    console.log(`${session_id} joined`);
}

function send_message(message, cb) {

    let data = {
        client_id: user.client_id,
        user_id: user.user_id,
        client_id: socket.id,
        session_id: user.session_id,
        message: message
    }
    socket.emit("message", data);
    console.log(`${message} sent to room ${user.session_id}`);
}

function receive_message(cb) {
    socket.on("message", (data) => {
        console.log("Message received");
        console.log(data);
        cb(data);

    })
}

export {
    get_rooms, join_room, send_message, receive_message
}