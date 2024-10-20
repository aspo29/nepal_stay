const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./reviews")

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
    reviews: [
        {
          type: Schema.Types.ObjectId,
          ref: "Review",
        },
      ],
      owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
}, { timestamps: true });

accommodationSchema.post("findOneAndDelete", async (accommodation) => {
    if (accommodation) {
      await Review.deleteMany({ _id: { $in: accommodation.reviews } });
    }
  });

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;