const cors = require("cors");
const crypto = require("crypto");
let local_cache = {}; // For sessions
const io = require("./express");
const db = require('./database.js');


io.on("connect", socket => {
    let client_id = socket.id;
    console.log(`New client connected with client ID ${client_id}`);

    socket.on("create_session", (data) => {
        let time_stamp = Date.now();
        session_id = gen_session();
        let info = {
            client_id: data.client_id,
            user_id: data.user_id,
            time_stamp: time_stamp,
            session_id: session_id,
            category: data.category
        }
        socket.join(session_id, () => {
            console.log(`Room with session id ${session_id} with client ${client_id} created`);
            let response = {
                status: true,
                client_id: data.client_id,
                user_id: data.user_id,
                time_stamp: time_stamp,
                session_id: session_id
            };
            io.to(client_id).emit('session_created', response);
            let info = {
                client_id: data.client_id,
                user_id: data.user_id,
                time_stamp: time_stamp,
                session_id: session_id,
                category: data.category
            }
            //db.createSession(info);
        })


        //Add info to database
    });

    socket.on("join_room", (data) => {
        let time_stamp = Date.now();
        let session_id = data.session_id;
        //Get session details

        let recipient = {
            _id: '',
            client_id: '',
            username: '',
            name: ''
        };
        let info = {
            user_id: data._id,
            time_stamp: time_stamp,
            session_id: session_id
        };
        let message = {
            client_id: client_id,
            session_id: session_id,
            time_stamp: time_stamp,
            user_id: data.user_id,
            recipient: recipient,
            message: `${client_id} has joined the room`
        }

        socket.join(session_id, () => {
            socket.to(client_id).emit("message", info);
            socket.broadcast.to(session_id).emit("message", message);
            console.log(`${client_id} join ${session_id}`);
        }
        )
    });


    socket.on("message", (data) => {
        let time_stamp = Date.now();
        let session_id = data.session_id;
        let message = {
            client_id: client_id,
            session_id: session_id,
            time_stamp: time_stamp,
            user_id: data.user_id,
            message: data.message
        }
        // Maybe get info from database regarding user?

        socket.broadcast.to(session_id, message);
        // Put info in database

        //db.addMessage(message);


    })

    socket.on("leave_room", () => {

    })

    socket.on("disconnect", () => console.log(`${client_id} disconnected`));
});

function gen_session() {
    return crypto.randomBytes(32).toString("hex");
}


