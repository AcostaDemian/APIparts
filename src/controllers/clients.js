const db = require("./firebase.js")

async function getClients (req, res) {
    console.log("/clients ");
    db.ref('clients').once('value', (snapshot) => {
        const data = snapshot.val();
        res.send({
            message: 'Received!!',
            clients : data
        });
    })
}

module.exports = {
    getClients:getClients
}
