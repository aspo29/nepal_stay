const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const default_img = "https://i.postimg.cc/hQjVGkvt/image.png";
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
    filename: String,
    url: {
      type: String,
      default: default_img,
      set: (v) => v === "" ? default_img : v
    }
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
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    }
  }
}, { timestamps: true });

accommodationSchema.post("findOneAndDelete", async (accommodation) => {
  if (accommodation) {
    await Review.deleteMany({ _id: { $in: accommodation.reviews } });
  }
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;