const express = require("express");
const router = express.Router();

const passport = require("passport");
const User = require("../models/user.js");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const uploadCloud = require("../config/cloudinary.js");

// SIGNUP
router.get("/signup", (req, res) => {
  res.render("authentication/signup", { message: req.flash("error") });
});

router.post("/signup", uploadCloud.single("photo"), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const avatar = req.file.url ? req.file.url : "";
  const email = req.body.email;
  const roles = req.body.roles;

  // 1. Check username and password are not empty
  if (username === "" || password === "") {
    res.render("authentication/signup", {
      errorMessage: "Indicate username and password"
    });
    return;
  }

  User.findOne({ username })
    .then(user => {
      // 2. Check user does not already exist
      if (user) {
        res.render("authentication/signup", {
          errorMessage: "The username already exists"
        });
        return;
      }

      // Encrypt the password
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      //
      // Save the user in DB
      //

      const newUser = new User({
        username,
        password: hashPass,
        avatar,
        email,
        roles
      });

      newUser
        .save()
        .then(user => {
          // save user in session: req.user
          req.login(user, err => {
            if (err) return next(err); // Session save went bad

            res.redirect("/"); // All good, we are now logged in and `req.user` is now set
          });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

// LOGIN
router.get("/login", (req, res) => {
  res.render("authentication/login", { message: req.flash("error") });
  console.log("req: ", req);
});

router.post('/login', passport.authenticate('local', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

/*r
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      // Something went wrong authenticating user
      return next(err);
    }

    if (!user) {
      // Unauthorized, `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
      res.render("auth/login", { errorMessage: "Wrong password or username" });
      return;
    }

    // save user in session: req.user
    req.login(user, err => {
      if (err) {
        // Session save went bad
        return next(err);
      }

      // All good, we are now logged in and `req.user` is now set
      res.redirect("/");
    });
  })(req, res, next);
});
*/

//LOGOUT
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// FORGOT PASSWORD

module.exports = router;
