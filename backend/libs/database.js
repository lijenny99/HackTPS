const firebase = require('./firebase');
//CREATE FUNCTIONALITIES
//can confirm whether something was actually written into the database
function errCallback(err) {
  if (err) {
    console.log(err)
  }
  else {
    console.log('success')
  }
}
//initialize the original session with timestamp so i tcan be referenced elsewhere.
function newSession(session_id, timestamp, category = "") {
  var sessionData = {
    "timestamp": timestamp,
    "lastMessage": "",
    "category": category
  }
  firebase.database().ref('sessions/' + session_id).set(sessionData, errCallback)
}
//create a user that is mapped to the unique session
function newUser(session_id, user_id, client_id, username = "") {
  sessionData = {}
  sessionData[user_id] = {
    "client_id": client_id,
    "username": username
  }

  console.log(sessionData)
  firebase.database().ref('members/' + session_id).set(sessionData, errCallback)
}
//update without deleting children
function updateUser(session_id, user_id, client_id, username = "") {
  sessionData = {}
  sessionData[user_id] = {
    "client_id": client_id,
    "username": username
  }

  console.log(sessionData)
  firebase.database().ref('members/' + session_id).update(sessionData, errCallback)
}
function initializeMessage(session_id) {
  firebase.database().ref('messages/' + session_id).set({ initial: "" }, errCallback)
}
//the callable function to create a new session and store in the database.
//stores session, stores one client
function createSession(obj) {
  const client_id = obj.client_id;
  const user_id = obj.user_id;
  const time_stamp = obj.time_stamp;
  const session_id = obj.session_id;
  const category = obj.category;

  if (session_id && client_id && time_stamp && user_id) {
    newSession(session_id, time_stamp, category)
    newUser(session_id, user_id, client_id);
    initializeMessage(session_id);
  }
  else {
    return Error("one or more parameters are empty");
  }
}
//MESSAGE update
function addMessage(obj) {
  let message = {
    client_id: obj.client_id,
    //user_id: obj.data.user_id,
    //message: obj.data.message
    user_id: obj.user_id,
    message: obj.message
  }
  console.log("message")
  firebase.database().ref('messages/' + String(obj.time_stamp)).set(message, errCallback)
}
//READ information
//find out members in a chat, returns user_ids via a promise
function getMembers(session_id) {
  if (session_id) {
    return firebase.database().ref('members/' + session_id)
      .once('value').then(function (snapshot) {
        var keys = Object.keys(snapshot.val())

        return snapshot.val()
      })
  }
}
module.exports = {
  addMessage: addMessage,
  newSession: newSession,
  newUser: newUser,
  getMembers: getMembers,
  updateUser: updateUser,
  createSession: createSession
}
