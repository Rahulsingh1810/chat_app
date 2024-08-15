const express = require('express')
const registerUser = require('../controller/registerUser')
const router = express.Router()
const checkEmail = require('../controller/checkEmail')

//create user api
router.post('/register',registerUser)

//check user email api

router.post('/email',checkEmail)


module.exports = router
