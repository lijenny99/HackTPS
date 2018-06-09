const io = require('socket.io')({
    path: '/api',
    serveClient: false
});
const cors = require("cors");
const server = require("http").createServer();
const crypto = require("crypto");

let local_cache = {}; // For sessions


io.attach(server, {

});

server.listen(3000, () => console.log(`Socket opened at 3000`));

io.on("connection", socket => {
    let client_id = socket.id;
    console.log(`New client connected with session ID ${session_id}`);

    socket.on("create_session", (data) => {
        let time_stamp = Date.now();
        session_id = gen_session();
        let info = {
            client_id: client_id,
            user_id: data.user_id,
            time_stamp: time_stamp,
            session_id: session_id,
            category: data.category
        }
        socket.join(session_id, () => {
            console.log(`Room with session id ${session_id} with client ${client_id} created`);
            socket.to(client_id).emit('session_created', {
                status: true,
                client_id: client_id,
                user_id: data.user_id,
                time_stamp: time_stamp,
                session_id: session_id
            })
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
            user_id: data._id,
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


    })

    socket.on("leave_room", () => {

    })

    socket.on("disconnect", () => console.log(`${session_id} disconnected`));
});

function gen_session() {
    let token;
    crypto.randomBytes(48, (err, buffer) => {
        token = buffer.toString('hex');
    })
    return token
}


