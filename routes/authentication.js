const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/user.js");
const Contrat = require("../models/contrat");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const uploadCloud = require("../config/cloudinary.js");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}

// SIGNUP
router.get("/signup", (req, res) => {
  res.render("authentication/signup", { message: req.flash("error") });
});

router.post("/signup", uploadCloud.single("photo"), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const avatar = req.file ? req.file.url : '<img src="https://img.icons8.com/ios/50/000000/day-care.png">';
  const email = req.body.email;
  const role = req.body.role;
  // const babyname = req.body.babyname;
  const nursame = req.body.nursame;
  const parentname = req.body.parentname;
  // const emailCorrespondant = req.body.emailCorrespondant;
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
    if (avatar == '') {
      avatar = 'https://img.icons8.com/ios/50/000000/day-care.png';
    }
    isParent = false;
    isNurse = true;
    //nursame = username;
  }
  
  User.findOne({ email })
    .then(user => {
      // 2. Check user does not already exist
      if (user) {
        res.render("authentication/signup", {
          errorMessage: "The emailusername already exists"
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
        // babyname,
        isParent,
        isNurse,
        nursame,
        parentname,
        // emailCorrespondant,
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
});

/*router.post('/login', passport.authenticate('local', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));*/

router.post('/login', (req, res, next) => {
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
    req.login(user, (err) => {
      if (err) {
        // Session save went bad
        return next(err);
      }

      // All good, we are now logged in and `req.user` is now set
      res.redirect('/')
    });
  })(req, res, next);
});


//LOGOUT
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/signup");
});

// PARENT WANTS TO ADD A BABY
// Saisir les infos du bébé dans un formulaire
// Récupérer les infos, et créer un nouveau user de type "baby"
// Dans le then, trouver l'object du parent qui crée le baby (donc toi en l'occurrence), et pusher l'ObjectId du bébé fraîchement créé dans l'array myChildren du parent
// Une méthode qui peut t'aider pour cette dernière étape, est .findByIdAndUpdate(), check le cours sur learn.ironhack

module.exports = router;
