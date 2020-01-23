const express = require("express");
const router = express.Router();
const uploadCloud = require("../config/cloudinary.js");
const mongoose = require('mongoose');

const User = require("../models/user.js");


//Page profil
router.get("/profil", async (req, res)  => {
  const childrensID = req.user.myChildren;
  const userChild = {};
//  debugger
    if(!!childrensID) {
      debugger
      
      // console.log('nurseUser: ', nurseUser)
      
      User.find({_id: req.user.myChildren})
      //.populate('myChildren')
      .then((babies) => {  
        debugger
        if(!babies) {
          res.render("profil/profil", {
            user: req.user,
            message: req.flash("error"),
          });
        }

        if(!!babies) {
          res.render("profil/profil", {
            user: req.user,
            message: req.flash("error"),
            babies: babies,
          });
        }
  
      })
      .catch(err => next(err))
      

      // User.find({isNurse: true})
      //     .then(nurse => {
      //         debugger
      //         console.log('nurseUser: ', nurse)
      //     })
      //     .catch(err => next(err))
    };
});


//Ajouter un bb
router.get("/add-baby", async (req, res)  => {
  const childrensID = req.user.myChildren;
  const userChild = {};
//  debugger
    if(!!childrensID) {
      debugger
      
      // console.log('nurseUser: ', nurseUser)
      
      User.find({_id: req.user.myChildren})
      //.populate('myChildren')
      .then((babies) => {  
        debugger
        if(!babies) {
          res.render("profil/add-baby", {
            user: req.user,
            message: req.flash("error"),
          });
        }

        if(!!babies) {
          res.render("profil/add-baby", {
            user: req.user,
            message: req.flash("error"),
            babies: babies,
          });
        }
  
      })
      .catch(err => next(err))
      

      // User.find({isNurse: true})
      //     .then(nurse => {
      //         debugger
      //         console.log('nurseUser: ', nurse)
      //     })
      //     .catch(err => next(err))
    };
});
router.post("/add-baby", uploadCloud.single("photo"), (req, res, next) => {
  const username = req.body.babyname;
  const age = req.body.babyage;
  const role = "baby";
  const avatar = req.file ? req.file.url : '<img src="https://img.icons8.com/ios/50/000000/day-care.png">';


  const newBaby = new User({
    username,
    role,
    age,
    avatar,
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
router.get("/update", (req, res)  => {
  res.render("profil/update", {
    user: req.user
  });
});

router.post("/update", uploadCloud.single("photo"), (req, res, next) => {
  const username = !!req.body.username;
  const password = !!req.body.password;
  const avatar = req.file ? req.file.url : "";
  const email = !!req.body.email;
  // const role = req.body.role;
  // let isParent;
  // let isNurse;

  // if (req.body.role === "parent") {
  //   isParent = true;
  //   isNurse = false;
  //   //parentname = username;
  // } else if (req.body.role === "nurse") {
  //   isParent = false;
  //   isNurse = true;
  //   //nursame = username;
  // }

  const updateInfos = {
    username,
    password,
    avatar,
    email,
    // isNurse,
    // isParent
  };

  User.findByIdAndUpdate(req.user._id, {
    $push: {
      username: username,
      email: email,
      password: password,
      avatar: avatar,
      // role: role,
      // isParent,
      // isNurse
    }
  });
});

//Gestion de la garde : lié un bb à une nounou
router.get("/manage", async (req, res)  => {
  debugger
  const childrensID = req.user.myChildren;
  const nurses = [];

debugger; 

  if(!!childrensID) {
    
    
    User.find({role: 'nurse'})
        .then(nurses => {
          return nurses = nurses;
        })

    User.find({_id: req.user.myChildren})
        //.populate('myChildren')
        .then((babies) => {  
          if(!babies) {
            res.render("profil/manage", {
              user: req.user,
              message: req.flash("error"),
            });
          }

      if(!!babies) {
        res.render("profil/manage", {
          user: req.user,
          message: req.flash("error"),
          babies: babies,
          nurses: nurses,
        });
      }

      

      

    })
    .catch(err => next(err))
    
    // User.find({isNurse: true})
    //     .then(nurse => {
    //         debugger
    //         console.log('nurseUser: ', nurse)
    //     })
    //     .catch(err => next(err))
  };
})
router.post("/manage", uploadCloud.single("photo"), (req, res, next) => {
  debugger;
   const nurse = req.body.checkboxnurse;
   const baby = req.body.checkboxchild;

})
module.exports = router;
