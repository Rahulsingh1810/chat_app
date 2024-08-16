const express = require('express')
const registerUser = require('../controller/registerUser')
const router = express.Router()
const checkEmail = require('../controller/checkEmail')
const checkPassword = require ('../controller/checkPassword')
const userDetails = require('../controller/useDetails')
const logout = require('../controller/logout')
const updateUserDetails = require('../controller/updateUserDetails')

//create user api
router.post('/register',registerUser)

//check user email api

router.post('/email',checkEmail)

//check password api

router.post('/password',checkPassword)

//login user details api

router.get('/user-details',userDetails)

//logout user api

router.get('/logout',logout)

//update user api

router.post('/update-user',updateUserDetails)


module.exports = router
