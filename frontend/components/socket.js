import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000/api');

function connect(user, cb) {
    /*
    User layout:
    {
        user_id: String,
    }
    */

    socket.on("connection", () => {
        let response = {
            status: "connected",
            client_id: socket.id,
        }
        cb(response);
    });
}

function create_session(user, cb) {
    /*
    User layout:
    {
        user_id: String,
        client_id: String,
        category: String
    }
    */
    socket.emit("create_session", user);
    socket.on("session_created", (data) => {
        /* data layout:{
            status: true,
            client_id: client_id,
            user_id: data._id,
            time_stamp: time_stamp,
            session_id: session_id
        }*/
        cb(data);
    });
}

function send_message(user, message) {
    /*
    User layout:
    {
        user_id: String,
        client_id: String,
        category: String,
        session_id: String
    }
    */
    let data = {
        user_id: user.user_id,
        client_id: user.client_id,
        session_id: user.session_id,
        message: message,
    }

    socket.emit("message", data);
}

function listener(user, cb) {
    /*
    User layout:
    {
        user_id: String,
        client_id: String,
        category: String,
        session_id: String
    }
    */
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

exports = {
    connect, create_session, send_message, listener
}