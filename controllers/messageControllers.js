const Message = require('../models/Message');

// Send message
const sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;

  const message = await Message.create({
    sender: req.user._id,
    receiver: receiverId,
    content,
  });

  res.status(201).json(message);
};

// Get messages between two users
const getMessages = async (req, res) => {
  const otherUserId = req.params.userId;

  const messages = await Message.find({
    $or: [
      { sender: req.user._id, receiver: otherUserId },
      { sender: otherUserId, receiver: req.user._id },
    ],
  }).sort({ createdAt: 1 });

  res.json(messages);
};

module.exports = { sendMessage, getMessages };