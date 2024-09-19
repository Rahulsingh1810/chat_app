const { MessageModel, ConversationModel } = require('../models/ConversationModel');
const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken');

const sendMessage = async (req, res) => {
  try {
    const token = req.cookies.token || "";
    const sender = await getUserDetailsFromToken(token);
    const { receiverId, text, imageUrl, videoUrl } = req.body;

    let conversation = await ConversationModel.findOne({
      $or: [
        { sender: sender._id, receiver: receiverId },
        { sender: receiverId, receiver: sender._id }
      ]
    });

    if (!conversation) {
      conversation = new ConversationModel({
        sender: sender._id,
        receiver: receiverId,
        messages: []
      });
    }

    const newMessage = new MessageModel({
      text,
      imageUrl,
      videoUrl
    });

    await newMessage.save();
    conversation.messages.push(newMessage._id);
    await conversation.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const token = req.cookies.token || "";
    const user = await getUserDetailsFromToken(token);
    const { friendId } = req.params;

    const conversation = await ConversationModel.findOne({
      $or: [
        { sender: user._id, receiver: friendId },
        { sender: friendId, receiver: user._id }
      ]
    }).populate('messages');

    if (!conversation) {
      return res.status(404).json({ message: "No conversation found" });
    }

    res.json(conversation.messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessages
};