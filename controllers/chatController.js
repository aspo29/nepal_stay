const Chat = require('../models/chat');
const Message = require('../models/message');
const User = require('../models/user');
const mongoose = require('mongoose');

module.exports.renderChats = async (req, res, next) => {
    try {
        const currentUser = req.user;
        const chats = await Chat.find({
            user: { $ne: currentUser._id } // Fetch chats where the user is not the current user
        })
            .populate('user', 'username') // Populate the user field
            .populate({
                path: 'messages',
                populate: { path: 'sender', select: 'username' } // Populate sender of messages
            })
            .populate('lastMessageSender', 'username') // Populate last message sender
            .exec();

            // console.log("Fetched Chats:", chats);
            // Format chat data for front-end
            const chatData = await Promise.all(chats.map(async chat => {
            otherUserId = chat.user._id;

            // Fetch the other user details
            const otherUserDetails = await User.findById(otherUserId).select('username').exec();
            otherUser = otherUserDetails.username;

            // Log the identified other user
            // console.log("Identified Other User ID:", otherUserId);
            // console.log("Identified Other User:", otherUser);

            // Return the chat data
            return {
                _id: chat._id,
                otherUserId: otherUserId,
                otherUser: otherUser,
                messages: chat.messages.map(message => ({
                    _id: message._id,
                    text: message.text,
                    sender: message.sender.username,
                })),
                lastMessage: chat.lastMessage,
                isLastMessageYours: chat.isLastMessageYours,
            };
        }));
        // console.log("Formatted Chat Data:", chatData);

        // Render chat UI
        res.render('./Chats/index.ejs', {
            user: { username: currentUser.username, name: currentUser.name },
            chats: chatData,
            currentUser
        });
    } catch (err) {
        console.error("Error fetching chats:", err);
        next(err);
    }
};


module.exports.addMessage = async (req, res, next) => {
    try {
        const { chatId } = req.params;  // Get the chat ID from the route
        const { text } = req.body; // Get the message text from the request body

        if (!text.trim()) {
            return res.status(400).json({ error: "Message cannot be empty" });
        }

        // Create a new message and save it to the DB
        const newMessage = new Message({
            text: text,
            sender: req.user._id,  // Get the sender's ID from req.user
            receiver: req.body.receiver, // Include the receiver ID from the request
            chat: chatId
        });

        await newMessage.save();

        // Find the chat and update it with the new message
        const chat = await Chat.findById(chatId);
        chat.messages.push(newMessage._id);
        chat.lastMessage = text; // Set the last message text
        chat.lastMessageSender = req.user._id; // Update the sender of the last message
        chat.isLastMessageYours = true; // The last message is from the current user
        await chat.save();

        // Emit the message via socket.io for real-time updates
        // req.io.to(chatId).emit('chat message', {
        //     chatId,
        //     msg: text,
        //     username: req.user.username,  // Get the sender's username
        //     senderId: req.user._id        // Get the sender's ID
        // });

        // If you have a separate logic to handle receiver chat updates
        const receiverChat = await Chat.findOne({ user: req.body.receiver });
        if (receiverChat) {
            receiverChat.messages.push(newMessage._id);
            await receiverChat.save();
        }

        res.redirect(`/chats`);
    } catch (err) {
        console.error("Error adding message:", err);
        next(err);
    }
};
