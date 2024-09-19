const express = require('express')
const registerUser = require('../controller/registerUser')
const router = express.Router()
const checkEmail = require('../controller/checkEmail')
const checkPassword = require ('../controller/checkPassword')
const userDetails = require('../controller/useDetails')
const logout = require('../controller/logout')
const updateUserDetails = require('../controller/updateUserDetails')
const {sendMessage,getMessages} = require('../controller/messageController')

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

//get all users api

router.get('/search-users', require('../controller/searchUsers'));

//send message api

router.post('/send-message',sendMessage)

//get messages api

router.get('/get-messages/:friendId',getMessages)




module.exports = router
