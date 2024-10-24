const Accommodation = require("./models/accommodations");
const Review = require("./models/reviews.js");
const ExpressError = require("./utils/ExpressError.js")
const { accommodationSchema ,reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create accommodations!")
        return res.redirect("/login")
    }
    next()
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
}
module.exports.saveOriginalUrl = (req, res, next) => {
    req.session.redirectUrl = req.originalUrl
    next();
}

module.exports.isOwner = async(req, res, next) => {
    let {id} = req.params;
    let accommodation = await Accommodation.findById(id);
    if(!accommodation.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not owner of the accommodations!")
        return res.redirect(`/accommodations/${id}`)
    }
    next();
}

module.exports.validateAccommodation = (req, res, next) => {
    let { error } = accommodationSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map(el => el.message).join(",")
        console.log(errMsg)
        throw new ExpressError(404, errMsg)
    } else {
        next();
    }
}
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map(el => el.message).join(",")
        console.log(errMsg)
        throw new ExpressError(404, errMsg)
    } else {
        next();
    }
}
module.exports.isReviewAuthor = async(req, res, next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not author of the review!")
        return res.redirect(`/accommodations/${id}`)
    }
    next();
}