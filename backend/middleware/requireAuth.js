const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

  // verify user is authenticated
    const { authorization } = req.headers

    // to check if headers exists
    // and if it has a value
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    // get token from authorization
    // which has two forms
    // 1. the bearer 'bearer'
    //  2. the hidden code that's divided into 3 parts by a dot
    // dknkfncknjdljsc.fkjnksnkvcnknkcfkf.cjdjjcbjbjbvcjjdsnc
    const token = authorization.split(' ')[1] // now we have picked the second

    try {
        // verify token
        // then grab _id
        const { _id } = jwt.verify(token, process.env.SECRET)

        // to find user by id, the attach just the id property to it
        req.user = await User.findOne({ _id }).select('_id')
        next()
    } catch (error) {
        console.log(error)
        // if user id doesn't exist
        res.status(401).json({ error: 'Request is not authorized' })
    }

}

module.exports = requireAuth