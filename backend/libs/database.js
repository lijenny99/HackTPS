const firebase = require('./firebase');
//CREATE FUNCTIONALITIES
//can confirm whether something was actually written into the database
function errCallback(err){
  if(err){
    console.log(err)
  }
  else{
    console.log('success')
  }
}
//initialize the original session with timestamp so i tcan be referenced elsewhere.
function newSession(session_id, timestamp, category="") {
  var sessionData = {
    "timestamp": timestamp,
    "lastMessage": "",
    "category": category
  }
  firebase.database().ref('sessions/' + session_id ).set( sessionData, errCallback)
}
//create user that is mapped to the unique session
function addUser(session_id, user_id, client_id, username=""){
  sessionData = {}
  sessionData[user_id] = {
      "client_id": client_id,
      "username": username
    }

  console.log(sessionData)
  firebase.database().ref('members/'+ session_id).set(sessionData, errCallback)
}
function initializeMessage(session_id){
  firebase.database().ref('messages/'+ session_id).set({test: 'test'}, errCallback)
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
    addUser(session_id, user_id, client_id)
    initializeMessage(session_id)
  }
  else{
    return Error("one or more parameters are empty");
  }
}
//MESSAGE update
function addMessage(obj){
  let message = {
           client_id: obj.client_id,
           //user_id: obj.data.user_id,
           //message: obj.data.message
           user_id: obj.user_id,
           message: obj.message
       }
  firebase.database().ref('messages/' + obj.session_id + "/" + obj.time_stamp).set(message, errCallback)
}
//READ information
function getMembers(session_id){
  if(session_id){
    firebase.database().ref('members/' + session_id)
    .once('value').then(function(snapshot){
      return snapshot.val();
    })
  }
}
const testObj = {
  client_id: "clientid",
  user_id: "user_id",
  time_stamp: "time_stamp",
  session_id: "sessionid",
  category: "party"
}
let message1 = {
           client_id: 1234,
           session_id: 3,
           time_stamp: 12345632435,
           user_id: 1231,
           message: "testing"
       }
let message2 = {
                client_id: 12345,
                session_id: 3,
                time_stamp: 12345632436,
                user_id: 1231,
                message: "testing"
  }
