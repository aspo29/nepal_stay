const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        default: "https://i.postimg.cc/hQjVGkvt/image.png",
        set: (v) => v === "" ? "https://i.postimg.cc/hQjVGkvt/image.png" : v,
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });


const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;