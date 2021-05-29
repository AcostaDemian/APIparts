const db = require("./firebase.js")
const intFunc = require("../public/internalFunctions.js")

async function getParts (req, res) {
    console.log("/parts/");
    db.ref('parts').once('value', (snapshot) => {
        const data = snapshot.val();
        res.send({
            message: 'Received!!',
            parts : data
        });
    })
};

async function getPartsByClient (req, res) {
    console.log("/parts/byClient ", req.params.client);
    db.ref('parts').orderByChild("client").equalTo(req.params.client).once('value', (snapshot) => {
        const data = snapshot.val();
        res.send({
            message: 'Received!!',
            parts : data
        });
    })
};

async function getPartsByUser (req, res) {
    console.log("/parts/byUser ", req.params.user);
    db.ref('parts').orderByChild("user").equalTo(req.params.user).once('value', (snapshot) => {
        const data = snapshot.val();
        res.send({
            message: 'Received!!',
            parts : data
        });
    })
}

async function addPart (req, res)  {
    console.log("/parts/add ", req.body)
    const { uid } = res.locals
    const newPart = {
        user: uid,
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
    console.log("/parts/delete ", req.params.id)
    db.ref('parts/' + req.params.id).remove();

    res.send({
        message: 'Deleted!!',
        id : req.params.id
    });
}

async function addHolidays (req, res) {
    console.log("/parts/addHolidays ", req.body.dateStart, req.body.dateEnd)
    
    var dateStart = intFunc.formatDate(req.body.dateStart);
    var dateEnd = intFunc.formatDate(req.body.dateEnd);
    var loop = new Date(dateStart)
    const { uid } = res.locals

    console.log(loop);
    console.log(dateEnd);
    var parts = [];
    
    while (loop <= dateEnd) {  
        if (intFunc.dayOfWeek(loop))
        {
            const newPart = {
                user: uid,
                client: req.body.client,
                date: intFunc.formatStringDate(loop),
                task: req.body.task
            };
            parts.push(newPart);
            db.ref('parts').push(newPart);
        }
        var newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
    }
    res.send({
        message: 'addHolidays!!',
        data : parts
    });
}



module.exports = {
    getParts:getParts,
    getPartsByClient:getPartsByClient,
    getPartsByUser:getPartsByUser,
    addPart:addPart,
    deletePart:deletePart,
    addHolidays:addHolidays
}