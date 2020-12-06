const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post, Hashtag } = require("../schemas");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/board", async (req, res, next) => {
  // render main page
  try {
    res.render("main", { title: "Community Service", header: "board" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
