const User = require('../models/UserModel');

const searchUsers = async (req, res) => {
    try {
        const { term } = req.query;
        const users = await User.find({
            $or: [
                { name: { $regex: term, $options: 'i' } },
                { email: { $regex: term, $options: 'i' } }
            ]
        }).select('name email profile_pic');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = searchUsers;