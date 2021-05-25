const {Router} = require('express');
const router = Router();

const {getParts,getPartsByClient,getPartsByUser,addPart,deletePart} = require("../controllers/parts");
const {getClients} = require("../controllers/clients");
const {createUser} = require("../controllers/users");
const {isAuthenticated} = require("../auth/authenticated");

const admin = require("firebase-admin")

// Users
router.post('/createUser/', 
createUser);

// Parts
router.get('/parts/', 
getParts);

router.get('/parts/byClient/', 
getPartsByClient);

router.get('/parts/byUser/', 
getPartsByUser);

router.post('/parts/add', 
addPart);

router.post('/parts/delete/:id', 
deletePart);

// Clients
router.get('/clients/', 
getClients);

// Export the router
module.exports = router;