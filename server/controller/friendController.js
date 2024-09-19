const UserModel = require('../models/UserModel');
const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken');

const addFriend = async (req, res) => {
    try {
        const token = req.cookies.token || "";
        const user = await getUserDetailsFromToken(token);
        const { friendId } = req.body;

        if (user._id.toString() === friendId) {
            return res.status(400).json({ message: "You can't add yourself as a friend" });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            user._id,
            { $addToSet: { friends: friendId } },
            { new: true }
        ).populate('friends', 'name email profile_pic online'); // Ensure online status is populated

        res.json({ message: "Friend added successfully", friends: updatedUser.friends });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFriends = async (req, res) => {
    try {
        const token = req.cookies.token || "";
        const user = await getUserDetailsFromToken(token);

        const userWithFriends = await UserModel.findById(user._id)
            .populate('friends', 'name email profile_pic online'); // Ensure online status is populated

        res.json(userWithFriends.friends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addFriend, getFriends };