const express = require('express')

// controller <MdFunctions />const {
const {
    signupUser,
    loginUser
} = require('../controllers/userControler')


const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)


module.exports = router