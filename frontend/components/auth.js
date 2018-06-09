const firebase = require('./firebase');
const auth = firebase.auth();

function createUser(email, password, callback) {
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            callback('Success');
        })
        .catch((err) => {
            console.log(err);
            callback("Error");
        });
}

function login(email, password, callback) {
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log(`Authenticated!`);
            callback("Authenticated");
        })
        .catch((err) => {
            console.log(err);
            callback("Error");
        })
}
function checkState(callback) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            callback(user);
        } else {
            callback(null);
        }
    })
}

export {
    createUser,
    login,
    checkState
}








