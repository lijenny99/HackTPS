const firebase = require('./firebase');
function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
//initialize the original session with timestamp so i tcan be referenced elsewhere.
function newSession(session_id, timestamp, category="") {
  var sessionData = {
    "timestamp": timestamp,
    "lastMessage": "",
    "category": category
  }
  firebase.database().ref('sessions/' + session_id ).set( sessionData )
}
//create user that is mapped to the unique session
function logUser(session_id, user_id, client_id, username=""){
  var sessionData = {
    user_id: {
      "client_id": client_id,
      "username": username
    }
  }
  firebase.database().ref('members/'+ session_id).set( sessionData )
}

//the callable function to create a new session and store in the database.
//stores session, stores one client
function createSession(obj){
  const client_id = obj.client_id
  const user_id = obj.user_id
  const time_stamp = obj.user_id
  const session_id = obj.session_id
  const category = obj.category

  if (session_id && client_id && time_stamp && user_id){
    newSession(session_id, time_stamp, category)
    logUser(session_id, user_id, client_id)
  }
  else{
    return Error("one or more parameters are empty");
  }
}
const testObj = {
  client_id: "clientid",
  user_id: "user_id",
  time_stamp: "time_stamp",
  session_id: "sessionid",
  category: "party"
}
writeUserData(1,1,1,1)
console.log("updated")
process.exit()
