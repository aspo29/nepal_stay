const express = require('express');
const mongoose = require('mongoose');
const accommodationRoutes = require('./routes/accommodationRoutes');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js")
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));
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
    
// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Routes for accommodations
app.use('/accommodations', accommodationRoutes);

//Error handler
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"))
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("Accommodations/error.ejs", { message })
    // res.status(statusCode).send(message)
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});