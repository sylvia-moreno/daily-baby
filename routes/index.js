const express = require("express");
const router = express.Router();

const eachDayOfInterval = require("date-fns/eachDayOfInterval");
const getDay = require("date-fns/getDay");
const format = require("date-fns/format");

const Post = require("../models/post.js");
const Card = require("../models/card");

// const frLocale = require("date-fns/locale/fr");

// const language = "fr";
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
  const today = new Date();
  const day = format(today, "d") + ' ';
  const month = format(today, "MMM") + ' ';
  const year = format(today, "yyyy") + ' ';

    const todayDate = day + month + year;

  const daysInterval = eachDayOfInterval(
    {
      start: new Date(2020, 00, 01),
      end: new Date()
    }
    // { locale: frLocale }
  );

  let daysData = [];
  daysInterval.map(d => {
    return daysData.push({
      day: format(d, "d"),
      month: format(d, "MMM"),
      year: format(d, "yyyy")
    });
    return a;
  });

  Post.find().then(posts => {
    /* const arrPosts = posts.map(post => ({
      id: post.id,
      content: post.content,
      createdDay: format(d, "d"),
      createdMonth: format(d, "MMM"),
      createdYear: format(d, "yyyy")
    })); */
    res.render("index", {
      user: req.user,
      days: daysData.reverse(),
      posts: posts,
      todayDate: todayDate,
    });
  });
  
  console.log("todayDate:", todayDate);
});

module.exports = router;
