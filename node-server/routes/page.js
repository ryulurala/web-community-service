const express = require("express");

const { Board, Gallery } = require("../schemas/post");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/board", async (req, res, next) => {
  // render board page
  try {
    const posts = await Board.find()
      .sort({ createdAt: -1 }) // 날짜별 내림차순 = 최신순
      .select({ title: 1 });
    // console.log(`posts = ${posts}`);
    res.render("board", {
      title: "Community Service",
      header: "board",
      posts: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/board/:id", async (req, res, next) => {
  try {
    // console.log(`id = ${req.params.id}`);
    const id = req.params.id;
    const post = await Board.findOne({ _id: id }).populate(
      "author",
      "nickname"
    );
    // console.log(`post.author = ${post.author}`);
    res.render("article", {
      title: "Community Service",
      header: "board",
      post: post,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/gallery", async (req, res, next) => {
  // render gallery page
  try {
    const posts = await Gallery.find()
      .populate("author", "nickname")
      .sort({ createdAt: -1 }); // 날짜별 내림차순 = 최신순
    res.render("gallery", {
      title: "Community Service",
      header: "gallery",
      posts: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
