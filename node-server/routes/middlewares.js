const multer = require("multer");
const path = require("path");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    // Forbidden
    res.status(403).send("Need to login");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    // redirect
    const message = encodeURIComponent("Already login");
    res.redirect(`/?error=${message}`);
  }
};

exports.upload = multer({
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
