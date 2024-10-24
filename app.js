if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}
const express = require('express');
const mongoose = require('mongoose');
const accommodationRoutes = require('./routes/accommodationRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const chatsRoutes = require('./routes/chatRoutes.js');
const usersRoutes = require('./routes/userRoutes');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js")
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const dbURI = process.env.ATLAS_URL;
// const dbURI = 'mongodb://localhost:27017/nepalstay';
const PORT = process.env.PORT || 3000;

// Chat 
const { Server } = require("socket.io");
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

// Middleware to parse JSON requests
app.use(express.json());

// Set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));
app.use('/uploads', express.static('uploads'));
app.engine('ejs', ejsMate);


const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};
connectDB();

const store = MongoStore.create({
    mongoUrl: dbURI,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("error in MONGEO SESSION STORE", err);
});
    
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false, 
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      },
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to pass flash messages to all views
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
  });

// Basic route
app.get('/', (req, res) => {
    res.render('layouts/index');
});

// Routes for accommodations
app.use('/accommodations', accommodationRoutes);
app.use('/accommodations/:id/reviews', reviewsRoutes);
app.use('/chats', chatsRoutes);
app.use('/', usersRoutes);


app.use((req, res, next) => {
    req.io = io;
    next();
});

// Socket connection
// In your socket.io connection logic
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinRoom', (chatId) => {
        socket.join(chatId);  // Join the room with the chatId
    });

    socket.on('chat message', async (data) => {
        const { chatId, msg, username, senderId, receiverId } = data;

        // Create a new message
        const message = new Message({ text: msg, sender: senderId, receiver: receiverId });
        await message.save();

        // Find or create the chat document
        let chat = await Chat.findOne({ _id: chatId });

        if (!chat) {
            chat = new Chat({
                user: senderId, // or receiverId based on your structure
                messages: [message._id],
                lastMessage: msg,
                lastMessageSender: senderId,
                isLastMessageYours: true,
            });
        } else {
            chat.messages.push(message._id);
            chat.lastMessage = msg;
            chat.lastMessageSender = senderId;
            chat.isLastMessageYours = (senderId === chat.lastMessageSender.toString());
        }

        await chat.save();

        // Emit the message to all users in the chat room
        io.to(chatId).emit('chat message', {
            chatId,
            msg,
            username,
            senderId
        });
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

//Error handler
// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page not found!"))
// })

// app.use((err, req, res, next) => {
//     let { statusCode = 500, message = "Something went wrong!" } = err;
//     res.status(statusCode).render("Accommodations/error.ejs", {statusCode, message })
//     // res.status(statusCode).send(message)
// })

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});