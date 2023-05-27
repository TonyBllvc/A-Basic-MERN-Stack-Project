const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


// to crease a web token 
const createToken = (_id) => {
    
    // create a reuseable function
    // ( taking in three arguments. 
    //  1. the payload which is the {_id})
    // 2. the secret for just the server (stored on the '.env' file)
    // 3. any property -- this case, the expires property
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

// login user
const loginUser = async (req, res) => {
    // for logging in 
    const { email, password } = req.body

    try {
        // pick up user and password(with hash) 
        const user = await User.login(email, password)  

        // create a token for already register user
        // to login
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        // pick up user and password(with hash) 
        const user = await User.signup(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = { signupUser, loginUser }