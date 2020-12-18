const express = require("express");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport");
const ejsLayouts = require("express-ejs-layouts");

// routes
const connect = require("./schemas");
const indexRouter = require("./routes");
const authRouter = require("./routes/auth");
const pageRouter = require("./routes/page");
const postRouter = require("./routes/post");
const messageRouter = require("./routes/msg");

dotenv.config();

// express init
const app = express();
app.set("port", process.env.PORT || 8000);

// view engine setup
app.use(ejsLayouts);
app.set("layout", path.join(__dirname, "views/layouts/layout.ejs"));
app.set("view engine", "ejs");

// logging
app.use(morgan("dev"));

// static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));

// body-parser in express
app.use(express.json());

// use querystring module(default: express generator)
app.use(express.urlencoded({ extended: false }));

// mongoose connect(index.js)
connect();

// cookie, session
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

// passport
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

// router
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/page", pageRouter);
app.use("/post", postRouter);
app.use("/msg", messageRouter);

// router error
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} No router!!`);
  error.status = 404;
  next(error);
});

// internal server error
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);

  // render error page
  res.render("error", { layout: "./error.ejs" });
});

// listen
app.listen(app.get("port"), () => {
  console.log(app.get("port"), " Listening...");
});
