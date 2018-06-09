const socket = require("socket.io-client")('http://localhost:80');

socket.on("connect", () => {
    let client_id = socket.id;
    console.log("Connected");

    socket.emit("create_session", {
        client_id: client_id,
        user_id: 'yo',
        category: 'hello'

    })

    socket.on("session_created", (data) => {
        console.log(data);
    })

    socket.on("message", (res) => {
        console.log(res);
    })
})