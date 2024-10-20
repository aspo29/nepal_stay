/**
 * We have created this `/init` folder to initialise database with fresh data.
 * so, we can perform project setup and data initialisation in this file.
 */
const mongoose = require("mongoose");
const initData = require("./data.js"); 
const Accommodations = require("../models/accommodations.js"); // Importing Accommodations model from models folder.
const User = require("../models/user.js");
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
    
// const initDB = async () => {
//     try {
//         await Accommodations.deleteMany({});
//         console.log("Existing data cleared.");
//         initData.data = initData.data.map((obj) => ({
//             ...obj,
//             owner: "670fec56e5302b46801476e1",
//           }));
//         await Accommodations.insertMany(initData.data);
//         console.log("Data is initialized.");
//     } catch (err) {
//         console.error("Error during data initialization:", err);
//     }
// };

// initDB();


// Function to create a user (no need to check if they exist)
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

        // Step 2: Create the user
        const userInfo = {
            email: "aashu@gmail.com",
            username: "aashu",
            salt: "d7bd742b0d669363e1fcdd8daaddfabe606ef7ed037ec6319e258486bca3acd4",
            hash: "811953fd68947bf531f265d7df054fb69232da968f399a2e4111cb4907d0065e49c6b7a7cd30daaee1435f6a393c6b22c0732977e60fa07466d52ec0d9388067cb3cc3926bcf729c6c7809c43f0e9228d7235c730aca5b29ba32d5f5d7a5953d61c43abf07874024d4c586f0f61b7e48e439fff3431262dd7cea454aaab2c64a150c1db1cbbc7b70099554dfceb1faa78a1e36209c2cc119fea776ff14b10cbe15c87f41ec09c387553bc2a6b789479a76ab98e33fb37f83a3405489dd037bb22a8d1addf240fe811c27f58a121226bfe77093d7f4be7791ac72cb9106ed23ea7c5dc0ac690feb4e1754613192f7ac236fd3dfde1af1d7d67692c94a19909270802cddad00817b1b3f495fc788723a3c8966ad28d85c34b7eb45486e67b580fb1ddfbd5b7b8853be7182de9145081e8c378c63d139db56e4cdd6fa045c5f60fc517e37b22648db20a632985a058ad8afa30222a9431a9f175c17c96938152ffbe59dcf38021ffb7adba5f152894ef568bfec0987a83824477e75e0dea29be2ad9b1878fa59ccd6bd5148f7dc6bb4b7b611d7338da6bd1f6bba1fac9601ca4647168fb238e2f879d233ff5b8f492d4dfd727bc492e49c6bb4ba87074154f0d566cf87fa37824450e1b74e81f1d55c0f845a8a3305175d243312a4f840a4ad4a503b37d86e3fd0e7bad2274a43c2afe9cd4d20fdba9cb19ece5bafba3e84eecb5a", // Predefined user information
        };
        const ownerId = await createUser(userInfo);

        // Step 3: Insert sample accommodations data with ownerId
        const accommodationsWithOwner = initData.data.map((obj) => ({
            ...obj,
            owner: ownerId,
        }));

        await Accommodations.insertMany(accommodationsWithOwner);
        console.log("data initialized with owner.");
    } catch (err) {
        console.error("Error during data initialization:", err);
    }
};

// Call the initDB function to initialize the database
initDB();