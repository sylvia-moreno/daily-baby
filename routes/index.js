const express = require("express");
const router = express.Router();
const eachDayOfInterval = require("date-fns/eachDayOfInterval");
const getDay = require("date-fns/getDay");
const format = require("date-fns/format");
const frLocale = require("date-fns/locale/fr");

const Post = require("../models/post.js");

const language = "fr";
/*if(window.navigator.languages) {
  language = window.navigator.languages[0].split('-')[0];
} else {
  language = window.navigator.userLanguage || window.navigator.language;	
}*/

const locales = {
  //language: require(`date-fns/locale/${language}`)
  language: require(`date-fns/locale/fr`)
};

/* GET home page. */
router.get("/", (req, res, next) => {
  const daysInterval = eachDayOfInterval(
    {
      start: new Date(2020, 00, 01),
      end: new Date(2020, 00, 06)
    },
    { locale: frLocale }
  );

  let daysData = [];
  daysInterval.reduce((a, d) => {
    daysData.push({
      day: format(d, "d"),
      month: format(d, "MMM"),
      year: format(d, "yyyy")
    });
    return a;
  });

  Post.find().then(posts => {
    res.render("index", {
      title: "Express - Generated with IronGenerator",
      user: req.user,
      posts: posts,
      days: daysData.reverse()
    });
  });
});

module.exports = router;
