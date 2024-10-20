const express = require('express');
const mongoose = require('mongoose');
const accommodationRoutes = require('./routes/accommodationRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
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
const flash = require("connect-flash");
const PORT = process.env.PORT || 3000;

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

// MongoDB connection
const dbURI = 'mongodb://localhost:27017/nepalstay';

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};
connectDB();
    
const sessionOptions = {
    secret: 'your_string',
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
    res.send('Hello, World!');
});

// Routes for accommodations
app.use('/accommodations', accommodationRoutes);
app.use('/accommodations/:id/reviews', reviewsRoutes);
app.use('/', usersRoutes);

//Error handler
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"))
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("Accommodations/error.ejs", {statusCode, message })
    // res.status(statusCode).send(message)
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});