const express = require("express");
const router = express.Router();
const uploadCloud = require("../config/cloudinary.js");
const mongoose = require('mongoose');

const User = require("../models/user.js");


//Page profil
router.get("/profil", (req, res) => {
  const childrensID = req.user.myChildren;
  const userChild = {};
  //childrensID.map(child => {
    
    //const id = new mongoose.Types.ObjectId(child);
    if(!!childrensID) {
      //User.find({ '_.id': { $in: childrensID.map(child => new mongoose.Types.ObjectId(child)) }})
      User.findOne({_id: req.user.myChildren})
      .then(baby => {  
        debugger
        if(!baby) {
          res.render("profil/profil", {
            user: req.user,
            message: req.flash("error"),
          });
        }

        if(!!baby) {
          res.render("profil/profil", {
            user: req.user,
            message: req.flash("error"),
            babyname: baby.username
          });
        }
  
      })
      .catch(err => next(err))
      
    };

    res.render("profil/profil", {
      user: req.user,
      message: req.flash("error"),
    });
    
    console.log('userChild: ', userChild);
  //});
  
  
});

//Ajouter un bb
router.post("/add-baby", uploadCloud.single("photo"), (req, res, next) => {
  const username = req.body.babyname;
  const role = "baby";

  const newBaby = new User({
    username,
    role,
    isParent: false,
    isNurse: false
  });

  newBaby
    .save()
    .then(baby => {
      //User.findOneAndUpdate({_id: req.user._id} , ...)
      //req.user.myChildren.push(baby.id)
      //req.user.save()
      // User.findByIdAndUpdate(req.user._id, { $push: { myChildren: baby._id } })
      //     .populate('contrats', {baby: baby._id})
      //     .then(() => res.redirect("/"))
      //     .catch(err => console.log(err));

      User.findByIdAndUpdate(req.user._id, { $push: { myChildren: baby, contrats: baby._id }})
          .then(() => res.redirect("/profil"))
          .catch(err => console.log(err));
    })
    .catch(err => next(err));
});

//Mise à jour de profil
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

  User.findByIdAndUpdate(req.user._id, {
    $push: {
      username: username,
      email: email,
      password: password,
      avatar: avatar,
      role: role,
      isParent,
      isNurse
    }
  });
});

//Gestion de la garde : lié un bb à une nounou
router.post("/manage", uploadCloud.single("photo"), (req, res, next) => {
   
})
module.exports = router;
