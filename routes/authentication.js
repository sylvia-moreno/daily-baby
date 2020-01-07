const express = require("express");
const router = express.Router();

const passport = require("passport");
const User = require("../models/user.js");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const uploadCloud = require("../config/cloudinary.js");

const nodemailer = require("nodemailer");

let emailCorrespondant;
let username;

// SIGNUP
router.get("/signup", (req, res) => {
  res.render("authentication/signup", { message: req.flash("error") });
});

router.post("/signup", uploadCloud.single("photo"), (req, res, next) => {
  username = req.body.username;
  const password = req.body.password;
  const avatar = req.file ? req.file.url : '';
  const email = req.body.email;
  const role = req.body.role;
  const babyname = req.body.babyname;
  const nursame = req.body.nursame;
  const parentname = req.body.parentname;
  const emailCorrespondant = req.body.emailCorrespondant;
  const roleUser = req.body.role;
  let isParent; 
  let isNurse;

  // 1. Check username and password are not empty
  if (username === "" || password === "") {
    res.render("authentication/signup", {
      errorMessage: "Indicate username and password"
    });
    return;
  }

  // Roles
  if(req.body.role === 'parent') {
    isParent = true;
    isNurse = false;
    //parentname = username;

  } else if(req.body.role === 'nurse') {
    isParent = false;
    isNurse = true;
    //nursame = username;
  }

  if(!!emailCorrespondant) {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your email address',
        pass: 'your email password'
      }
    });
    transporter.sendMail({
      from: '"DailyBaby Project" <sylviamoreno.pro@gmail.com>',
      to: emailCorrespondant, 
      subject: `${username} vous invite à rejoindre son réseau DailyBaby`,
      text: `Inscrivez vous au réseau de ${username}`,
      html: `<p>Inscrivez vous au réseau de ${username}</p>`
    })
    .then(info => res.render('message', {email, subject, message, info}))
    .catch(error => console.log(error));
  }
  User.findOne({ username })
    .then(user => {
      // 2. Check user does not already exist
      if (user !== null) {
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
        role,
        babyname,
        isParent,
        isNurse,
        nursame,
        parentname,
        emailCorrespondant,
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

/*router.post('/login', passport.authenticate('local', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));*/


router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err) {
      // Something went wrong authenticating user
      return next(err);
    }

    if (!user) {
      // Unauthorized, `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
      res.render("authentication/login", { errorMessage: "Wrong password or email" });
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


//LOGOUT
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/signup");
});

// SEND EMAIL TO CORRESPONDANT
router.post('/send-email-correspondant', (req, res, next) => {
  //Email au correspodant 
  if(!!emailCorrespondant) {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your email address',
        pass: 'your email password'
      }
    });
    transporter.sendMail({
      from: '"DailyBaby Project" <sylviamoreno.pro@gmail.com>',
      to: emailCorrespondant, 
      subject: `${username} vous invite à rejoindre son réseau DailyBaby`,
      text: `Inscrivez vous au réseau de ${username}`,
      html: `<p>Inscrivez vous au réseau de ${username}</p>`
    })
    .then(info => res.render('message', {email, subject, message, info}))
    .catch(error => console.log(error));
  }
});

module.exports = router;
