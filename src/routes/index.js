const {Router} = require('express');
var cors = require('cors')
const router = Router();

const {getParts,getPartsByClient,getPartsByUser,addPart,deletePart,addHolidays} = require("../controllers/parts");
const {getClients,addClient,deleteClient} = require("../controllers/clients");
const {allUsers,createUser,deleteUser} = require("../controllers/users");
const {isAuthenticated} = require("../auth/authenticated");
const {isAuthorized} = require("../auth/authorized");

//CORS configuration
router.use(cors())

// Users
router.get('/users', 
    isAuthenticated,
    allUsers
);

router.post('/users/create', 
    isAuthenticated,
    //isAuthorized({ hasRole: ['admin', 'manager'] }),
    createUser
);

router.delete('/users/delete/:id', [
    isAuthenticated,
    //isAuthorized({ hasRole: ['admin', 'manager'] }),
    deleteUser
]);

// Parts
router.get('/parts/', 
isAuthenticated,
getParts);

router.get('/parts/byClient/:client', 
isAuthenticated,
getPartsByClient);

router.get('/parts/byUser/:user', 
isAuthenticated,
getPartsByUser);

router.post('/parts/add', 
isAuthenticated,
addPart);

router.post('/parts/addHolidays', 
isAuthenticated,
addHolidays);

router.delete('/parts/delete/:id', 
isAuthenticated,
deletePart);

// Clients
router.get('/clients/', 
isAuthenticated,
getClients);

router.post('/clients/add', 
isAuthenticated,
isAuthorized({ hasRole: ['admin', 'manager'] }),
addClient);

router.delete('/clients/delete/:id', 
isAuthenticated,
isAuthorized({ hasRole: ['admin', 'manager'] }),
deleteClient);

// Export the router
module.exports = router;