/**
 * We have created this `/init` folder to initialize the database with fresh data.
 * So, we can perform project setup and data initialization in this file.
 */

require('dotenv').config();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Accommodations = require("../models/accommodations.js"); // Importing Accommodations model from models folder.
const User = require("../models/user.js"); // Importing User model from models folder.
const userData = require('./user'); // Assuming userData is exported from this file

// MongoDB connection
const dbURI = process.env.ATLAS_URL; 
const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

connectDB();

// Function to create a user
const createUser = async (userInfo) => {
    try {
        const newUser = new User(userInfo);
        await newUser.save();
        return newUser._id; // Return the user's _id after saving
    } catch (err) {
        console.error("Error creating user:", err);
        throw err;
    }
};

// Initialize database with accommodations and assign an owner
const initDB = async () => {
    try {
        // Step 1: Clear existing data
        await Accommodations.deleteMany({});
        await User.deleteMany({});
        console.log("Existing data cleared.");

        // Step 2: Create users from userData
        const userIds = [];
        for (const userInfo of userData) {
            try {
                const ownerId = await createUser(userInfo);
                console.log(`User created with ID: ${ownerId}`);
                userIds.push(ownerId); // Collect user IDs
            } catch (error) {
                console.error('Failed to create user:', error.message);
            }
        }

        // Step 3: Insert sample accommodations data with owner IDs
        const accommodationsWithOwner = initData.data.map((obj, index) => ({
            ...obj,
            owner: userIds[index % userIds.length], // Assign an owner ID from the created users
        }));

        await Accommodations.insertMany(accommodationsWithOwner);
        console.log("Data initialized with accommodations and owners.");
    } catch (err) {
        console.error("Error during data initialization:", err);
    } finally {
        // Close the MongoDB connection
        mongoose.connection.close();
    }
};

// Call the initDB function to initialize the database
initDB();
