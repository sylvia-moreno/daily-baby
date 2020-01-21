const express = require("express");
const router = express.Router();
const uploadCloud = require("../config/cloudinary.js");

const User = require("../models/user.js");

router.get("/profil", (req, res) => {
  res.render("profil/profil", {
    user: req.user,
    message: req.flash("error")
  });
  console.log("user: ", req.user);
});

router.post("/add-baby", uploadCloud.single("photo"), (req, res, next) => {
  const babyname = req.body.username;
  const role = "baby";

  const newBaby = new User({
    babyname,
    role
  });

  newBaby
    .save()
    .then(baby => {
      //User.findOneAndUpdate({_id: req.user._id} , ...)
      req.user.myChildren.push(baby.id)
      req.user.save()
      //User.findByIdAndUpdate(req.user._id, { $push: { myChildren: baby._id } })
        .then(() => res.redirect("/"))
        .catch(err => console.log(err));
    })
    .catch(err => next(err));
});

router.post("/update", uploadCloud.single("photo"), (req, res, next) => {
  const username = !!req.body.username;
  const password = !!req.body.password;
  const avatar = req.file ? req.file.url : "";
  const email = !!req.body.email;
  const role = req.body.role;
  let isParent;
  let isNurse;

  if (req.body.role === "parent") {
    isParent = true;
    isNurse = false;
    //parentname = username;
  } else if (req.body.role === "nurse") {
    isParent = false;
    isNurse = true;
    //nursame = username;
  }

  const updateInfos = {
    username,
    password,
    avatar,
    email,
    role,
    isNurse,
    isParent
  };

  User.findByIdAndUpdate(
    req.user._id, 
    { 
      $push: { 
      username: username,
      email: email,
      password: password,
      avatar: avatar,
      role: role,
      isParent,
      isNurse,
    } 
  });
});

module.exports = router;
