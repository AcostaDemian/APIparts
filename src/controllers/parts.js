const db = require("./firebase.js")

async function getParts (req, res) {
    console.log("/");
    db.ref('parts').once('value', (snapshot) => {
        const data = snapshot.val();
        res.send({
            message: 'Received!!',
            parts : data
        });
    })
};

async function getPartsByClient (req, res) {
    console.log("/by-client ",req.body.client);
    db.ref('parts').orderByChild("client").equalTo(req.body.client).once('value', (snapshot) => {
        const data = snapshot.val();
        res.send({
            message: 'Received!!',
            parts : data
        });
    })
};

async function getPartsByUser (req, res) {
    console.log("/by-user ",req.body.user);
    db.ref('parts').orderByChild("user").equalTo(req.body.user).once('value', (snapshot) => {
        const data = snapshot.val();
        res.send({
            message: 'Received!!',
            parts : data
        });
    })
}

async function addPart (req, res)  {
    console.log("/add ", req.body)
    const newPart = {
        user: req.body.user,
        client: req.body.client,
        date: req.body.date,
        task: req.body.task
    };
    db.ref('parts').push(newPart);

    res.send({
        message: 'Received!!',
        data : newPart
    });
}

async function deletePart (req, res) {
    console.log("/delete-part ", req.params.id)
    db.ref('parts/' + req.params.id).remove();

    res.send({
        message: 'Deleted!!',
        id : req.params.id
    });
}

module.exports = {
    getParts:getParts,
    getPartsByClient:getPartsByClient,
    getPartsByUser:getPartsByUser,
    addPart:addPart,
    deletePart:deletePart
}