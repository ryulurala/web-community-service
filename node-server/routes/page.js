const express = require("express");
const fs = require("fs");
const path = require("path");
const { upload } = require("./middlewares");

const { Board, Gallery } = require("../schemas/post");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/board", async (req, res, next) => {
  // render board page
  try {
    const posts = await Board.find()
      .sort({ createdAt: -1 }) // 날짜별 내림차순 = 최신순
      .populate("author", "nickname");
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

router
  .get("/board/:id", async (req, res, next) => {
    try {
      // console.log(`id = ${req.params.id}`);
      const id = req.params.id;
      const post = await Board.findOne({ _id: id }).populate(
        "author",
        "nickname"
      );
      // console.log(`post.author = ${post.author.nickname}`);
      res.render("article", {
        title: "Community Service",
        header: `board:${post.author.nickname}`,
        post: post,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .patch("/board/:id", isLoggedIn, async (req, res, next) => {
    try {
      // console.log(`title = ${req.body.title}`);
      // console.log(`content = ${req.body.content}`);

      await Board.updateOne(
        { _id: req.params.id },
        {
          title: req.body.title,
          content: req.body.content,
        }
      );

      res.end("ok-update");
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete("/board/:id", isLoggedIn, async (req, res, next) => {
    try {
      await Board.deleteOne({
        _id: req.params.id,
      });

      res.end("ok-delete");
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

router
  .get("/gallery/:id", async (req, res, next) => {
    try {
      // console.log(`id = ${req.params.id}`);
      const id = req.params.id;
      const post = await Gallery.findOne({ _id: id }).populate(
        "author",
        "nickname"
      );
      // console.log(`post.author = ${post.author.nickname}`);
      res.render("image", {
        title: "Community Service",
        header: `Gallery:${post.author.nickname}`,
        post: post,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .put(
    "/gallery/:id",
    isLoggedIn,
    upload.single("img"),
    async (req, res, next) => {
      // 수정
      try {
        // 기존 파일 삭제
        const preFile = await Gallery.findOne({
          _id: req.params.id,
        }).select({ content: 1 });

        const realFileName = preFile.content.replace(/img/g, "uploads");
        const unlinkPath = path.join(__dirname, "../" + realFileName);

        fs.unlink(unlinkPath, (err) => {
          console.log("ok!");
        });

        // console.log("put==================" + req.file.filename);

        const newUrl = `/img/${req.file.filename}`; // 내부 경로 감추기

        await Gallery.updateOne(
          { _id: req.params.id },
          {
            content: newUrl,
          }
        );

        res.end("ok-update");
      } catch (err) {
        console.error(err);
        next(err);
      }
    }
  )
  .delete("/gallery/:id", isLoggedIn, async (req, res, next) => {
    // 삭제
    try {
      const file = await Gallery.findOne({
        _id: req.params.id,
      }).select({ content: 1 });

      // console.log(`fileName = ${file.content}`);
      const realFileName = file.content.replace(/img/g, "uploads");
      // console.log(`realFileName = ${realFileName}`);
      const unlinkPath = path.join(__dirname, "../" + realFileName);
      // console.log(`unlinkPath = ${unlinkPath}`);

      // 파일 삭제
      fs.unlink(unlinkPath, (err) => {
        console.log("ok!");
      });

      // DB document 삭제
      await Gallery.deleteOne({
        _id: file._id,
      });

      res.end("ok-delete");
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
