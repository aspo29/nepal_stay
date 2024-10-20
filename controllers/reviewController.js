const Review = require("../models/reviews.js");
const Accommodation = require("../models/accommodations.js");
const wrapAsync = require("../utils/wrapAsync.js");

module.exports.createReview = wrapAsync(async (req, res) => {
  let accommodation = await Accommodation.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  accommodation.reviews.push(newReview);

  await newReview.save();
  await accommodation.save();
  console.log(newReview);
  req.flash("success", "New Review Created Successfully!");

  res.redirect(`/accommodations/${accommodation._id}`);
});

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Accommodation.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted Successfully!");
  res.redirect(`/accommodations/${id}`);
};
