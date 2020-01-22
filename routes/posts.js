const express = require("express");
const router = express.Router();
const format = require("date-fns/format");

const Post = require("../models/post.js");
const Contrat = require("../models/contrat");
const uploadCloud = require("../config/cloudinary.js");

// les routes ont été préfixées en /posts dans app.js

// GET /post/new
router.get("/new", function(req, res, next) {
  if (!req.user) {
    res.redirect("authentification/login");
    return;
  }
  res.render("posts/new");
});

// POST /posts/new
router.post("/new", uploadCloud.single("pic"), function(req, res, next) {
  if (!req.user) {
    return next(new Error("Vous devez être logguer pour créer un post"));
  }

  Post.create({
    content: req.body.content,
    creatorId: req.user._id,
    picPath: !!req.file ? req.file.url : "",
    //picName: !!req.file ? req.file.originalname : '',
    creationDate: format(new Date(), "yyyy-MM-dd")
  });
  Contrat.create({
    messages: {
      content: req.body.content,
      creatorId: req.user._id,
      picPath: !!req.file ? req.file.url : "",
      //picName: !!req.file ? req.file.originalname : '',
      creationDate: format(new Date(), "yyyy-MM-dd")
    }
  })
    .then(post => res.redirect("/"))
    .catch(next);
});

router.get("/:id", function(req, res, next) {
  const id = req.params.id;
  const today = new Date();
  const day = format(today, "d") + " ";
  const month = format(today, "MMM") + " ";
  const year = format(today, "yyyy") + " ";

  const todayDate = day + month + year;
  Post.findById(id)
    .populate("comments.authorId") // on vient remplacer le nom de l'auteur id
    .then(post => {
      console.log("post", post.comments);

      res.render("posts/show", {
        post: post,
        user: req.user,
        todayDate: todayDate,
      });
    })
    .catch(next);
});

router.post("/:id/comments", uploadCloud.single("image"), function(
  req,
  res,
  next
) {
  if (!req.user)
    return next(new Error("You must be logged to create a comment"));

  const id = req.params.id;

  Post.update(
    { _id: id },
    {
      $push: {
        comments: {
          content: req.body.content,
          authorId: req.user.id,
          imagePath: !!req.file ? req.file.url : "",
          imageName: !!req.file ? req.file.originalname : ""
        }
      }
    }
  )
    .then(book => {
      res.redirect(`/posts/${id}`);
    })
    .catch(next);
});

module.exports = router;
