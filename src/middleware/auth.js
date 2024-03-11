const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismyproject')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.token = token //authenticate edilen token
        req.user = user

        next()

    } catch (error) {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismyproject')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log('auth middleware')
        console.log(token)
        console.log(user)
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth