import openSocket from 'socket.io-client';
const socket;

socket = openSocket('https://bravetheheat.herokuapp.com/api')

socket.on("connection", () => {
        let response = {
            status: "connected",
            client_id: socket.id,
        }
        cb(response);
});


function socket_send_message(user, message) {
    let data = {
        user_id: user.user_id,
        client_id: user.client_id,
        session_id: user.session_id,
        message: message,
    }

    socket.emit("message", data);
}

function socket_listener(user, cb) {
    socket.on("message", (data) => {
        /*
        data = {
             client_id: client_id, //Sender
             session_id: session_id,
             time_stamp: time_stamp,
             user_id: data.user_id, //Sender
             message: data.message
         }*/
        cb(data);
    })
}

export default sock;