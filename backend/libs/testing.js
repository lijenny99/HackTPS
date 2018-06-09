const firebase = require('./firebase');
function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

writeUserData(3,"testing", "testing", "success")
firebase.database().goOffline()

console.log('test')
process.exit()
