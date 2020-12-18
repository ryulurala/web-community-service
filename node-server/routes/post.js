const express = require("express");
const fs = require("fs");
const { upload } = require("./middlewares");

const { Board, Gallery } = require("../schemas/post");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

router.post("/board", isLoggedIn, async (req, res, next) => {
  // board 추가
  try {
    // console.log(req.user);
    const hashtags = req.body.hashtag.match(/#[^\s#]*/g);
    // console.log("hashtag = " + hashtags);
    await Board.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
      hashtags: hashtags,
    });
    res.redirect("/page/board");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post(
  "/gallery",
  isLoggedIn,
  upload.single("img"),
  async (req, res, next) => {
    // gallery 추가
    try {
      // console.log(req.user);
      // console.log(`req.file = ${req.file}`);
      const url = `/img/${req.file.filename}`; // 내부 경로 감추기
      // console.log(`url = ${url}`);
      const hashtags = req.body.hashtag.match(/#[^\s#]*/g);
      // console.log("hashtag = " + hashtags);
      await Gallery.create({
        content: url,
        author: req.user.id,
        hashtags: hashtags,
      });
      res.redirect("/page/gallery");
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

module.exports = router;
