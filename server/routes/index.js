const express = require('express')
const registerUser = require('../controller/registerUser')
const router = express.Router()
const checkEmail = require('../controller/checkEmail')
const checkPassword = require ('../controller/checkPassword')
const userDetails = require('../controller/useDetails')

//create user api
router.post('/register',registerUser)

//check user email api

router.post('/email',checkEmail)

//check password api

router.post('/password',checkPassword)

//login user details api

router.get('/user-details',userDetails)


module.exports = router