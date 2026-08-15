const User = require("../models/user.js");

//signup form
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

//signup
module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

//login form
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

//login
module.exports.login = async (req, res) => {
    req.flash("success", "Logged in successfully!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

//logout
module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You have been logged out!");
        res.redirect("/login");
    });
}