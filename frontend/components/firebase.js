const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyDWTeVZ1QRE5BeEQ8yjiu_LNtzon9BoA1g",
    authDomain: "hacktps-2bc24.firebaseapp.com",
    databaseURL: "https://hacktps-2bc24.firebaseio.com",
    projectId: "hacktps-2bc24",
    storageBucket: "hacktps-2bc24.appspot.com",
    messagingSenderId: "357270015514"
};
firebase.initializeApp(config);

module.exports = firebase;