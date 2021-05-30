const db = require("./firebase.js")

async function getClients (req, res) {
    console.log("/clients/");
    db.ref('clients').once('value', (snapshot) => {
        const data = snapshot.val();
        res.send({
            message: 'Received!!',
            clients : data
        });
    })
}

async function addClient (req, res)  {
    console.log("/clients/add", req.body)
    const newClient = {
        id: req.body.id,
        descrip: req.body.descrip
    };
    db.ref('clients').child(req.body.id).set(req.body.descrip);

    res.send({
        message: 'Received!!',
        data : newClient
    });
}

async function deleteClient (req, res) {
    console.log("/clients/delete ", req.params.id)
    db.ref('clients/' + req.params.id).remove();

    res.send({
        message: 'Deleted!!',
        id : req.params.id
    });
}


module.exports = {
    getClients,
    addClient,
    deleteClient
}