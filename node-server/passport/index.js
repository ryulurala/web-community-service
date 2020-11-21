const passport = require("passport");

// strategy
const local = require("./localStrategy");

// schema
const User = require("../schemas/user");

module.exports = () => {
  // object -> byte
  // by req.login(), only first time
  passport.serializeUser((user, done) => {
    done(null, user.id); // user.id -> first parameter of deserializeUser
  });

  // byte -> object
  // by passport.session()
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        console.log(`deserializeUser() user = ${user}`);
        done(null, user);
      }) // success: req.user = user
      .catch((err) => done(err));
  });

  local();
};
