const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Board, Gallery } = require("../schemas/post");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  // 하드디스크에 업로드 파일 저장
  storage: multer.diskStorage({
    destination(req, file, done) {
      // 저장할 경로
      done(null, "uploads/");
    },
    filename(req, file, done) {
      // 저장할 파일명(파일명+날짜+확장자)
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  // 파일 개수나 파일 사이즈 제한
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/board", isLoggedIn, async (req, res, next) => {
  // board 추가
  try {
    // console.log(req.user);
    const board = await Board.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
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
      // console.log(req.file);
      const url = `/img/${req.file.filename}`; // 내부 경로 감추기
      console.log(`url = ${url}`);
      const gallery = await Gallery.create({
        content: url,
        author: req.user.id,
      });
      res.redirect("/page/gallery");
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

module.exports = router;
