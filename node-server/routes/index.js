const express = require("express");
const { isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.use((req, res, next) => {
  // init
  res.locals.user = req.user;
  next();
});

router.get("/", async (req, res, next) => {
  // render main page
  try {
    res.render("main", { title: "Community Service", header: "main" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/about", async (req, res, next) => {
  // render about page
  try {
    res.render("about", { layout: "./about.ejs" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// router.get("/message_list", (req, res) => {
//   res.render("profile", { title: "My info" });
// });

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", { title: "Register", header: "Join" });
});

module.exports = router;
