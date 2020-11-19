const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  // init
  res.locals.user = req.user;
  next();
});

router.get("/", (req, res) => {
  // render main page
  res.render("index", { title: "Home", header: "Home" });
});

router.get("/about", (req, res) => {
  // render about page
  res.render("about", { title: "About", header: "About" });
});

router.get("/message_list", (req, res) => {
  res.render("profile", { title: "My info" });
});

router.get("/join", (req, res) => {
  res.render("join", { title: "Register" });
});

module.exports = router;
