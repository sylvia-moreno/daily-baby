const express = require("express");
const router = express.Router();
const moment = require('moment');
var eachDayOfInterval = require('date-fns/eachDayOfInterval')


const Post = require("../models/post.js");

/* GET home page. */
router.get("/", (req, res, next) => {
  const endDay = moment();
  const startDay = moment("2020-01-01");
  const result = eachDayOfInterval({
    start: new Date(2020, 01, 01),
    end: new Date()
  })

  Post.find().then(posts => {
    res.render("index", {
      title: "Express - Generated with IronGenerator",
      user: req.user,
      posts: posts, 
      daysCalendar: result,
    });
  });
});

module.exports = router;
