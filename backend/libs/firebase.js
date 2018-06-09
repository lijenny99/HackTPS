const admin = require('firebase-admin');

const serviceAccount = require('./files/serviceAccountKey.json');

const config = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hacktps-2bc24.firebaseio.com"
};
admin.initializeApp(config);

module.exports = admin;