const admin = require('firebase-admin')

async function allUsers(req, res) {
    try {
        const listUsers = await admin.auth().listUsers()
        const users = listUsers.users.map(mapUser)
        return res.status(200).send({ users })
    } catch (err) {
        return handleError(res, err)
    }
}

function mapUser(user) {
    const customClaims = (user.customClaims || { role: '' })
    const role = customClaims.role ? customClaims.role : ''
    return {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        role,
        lastSignInTime: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime
    }
}

async function createUser(req, res) {
    try {
        const { displayName, password, email, role } = req.body
 
        if (!displayName || !password || !email || !role) {
            return res.status(400).send({ message: 'Missing fields' })
        }
 
        const { uid } = await admin.auth().createUser({
            displayName,
            password,
            email
        })
        await admin.auth().setCustomUserClaims(uid, { role })
        
        return res.status(201).send({
            message: 'Created!!',
            id : uid
        })
    } catch (err) {
        return handleError(res, err)
    }
 }

 async function deleteUser(req, res) {
    try {
        const { id } = req.params
        await admin.auth().deleteUser(id)
        return res.status(201).send({
            message: 'Deleted!!',        
            id : id
        })
    } catch (err) {
        return handleError(res, err)
    }
 }


 function handleError(res, err) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
 }

module.exports = {
    createUser,
    allUsers,
    deleteUser
}