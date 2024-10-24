const mongoose = require('mongoose');

// Message schema definition
const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true, 
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now, 
        immutable: true
    }
});

module.exports = mongoose.model('Message', messageSchema);