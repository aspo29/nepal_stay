/**
 * We have created this `/init` folder to initialise database with fresh data.
 * so, we can perform project setup and data initialisation in this file.
 */
const mongoose = require("mongoose");
const initData = require("./data.js"); 
const Accommodations = require("../models/accommodations.js"); // Importing Accommodations model from models folder.

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
    
const initDB = async () => {
    await Accommodations.deleteMany({});
    await Accommodations.insertMany(initData.data);
    console.log("Data is initialized.");
};

initDB();