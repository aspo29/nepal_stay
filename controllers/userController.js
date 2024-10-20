const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');

module.exports.renderSignupForm = (req, res) => {
    res.render('users/signup.ejs');
};

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to NepalStay');
            return res.redirect('/accommodations');
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
        console.log(e);
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login.ejs');
};

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome to NepalStay!! You are logged in');
    let redirectUrl = res.locals.redirectUrl || '/accommodations';
    return res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'You are logged out now');
        return res.redirect('/accommodations');
    });
};
