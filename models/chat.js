const mongoose = require("mongoose");

// Chat schema definition
const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }],
    lastMessage: {
        type: String,
        default: ""
    },
    lastMessageSender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isLastMessageYours: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Chat", chatSchema);