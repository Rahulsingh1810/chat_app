const express = require('express');
const router = express.Router();
const { addFriend, getFriends } = require('../controller/friendController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add-friend', authMiddleware, addFriend);
router.get('/friends', authMiddleware, getFriends);

module.exports = router;