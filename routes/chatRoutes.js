
const express = require('express')
const router = express.Router()
const { isLoggedIn, saveOriginalUrl } = require('../middleware.js')
const asyncWrap = require('../utils/wrapAsync.js')
const chatsController = require('../controllers/chatController.js')


router.route('/')
    .get(saveOriginalUrl, isLoggedIn, asyncWrap(chatsController.renderChats)) //All Chats

// Route to add a new message
router.post('/:chatId/messages', chatsController.addMessage);

module.exports = router;