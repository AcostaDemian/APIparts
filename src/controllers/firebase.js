const admin = require("firebase-admin")

//TODO var
var serviceAccount = require("../../partes-6a5e6-firebase-adminsdk-4txfy-b761d8607f.json");

admin.initializeApp({
    credential : admin.credential.cert(serviceAccount),
    databaseURL : "https://partes-6a5e6-default-rtdb.firebaseio.com/"
});

const db = admin.database();

module.exports = db;