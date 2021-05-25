const admin = require('firebase-admin')

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
 
        return res.status(201).send({ uid })
    } catch (err) {
        return handleError(res, err)
    }
 }

 function handleError(res, err) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
 }

module.exports = {
    createUser:createUser
}