const passport = require("passport");

// strategy
const local = require("./localStrategy");

// schema
const User = require("../schemas/user");

module.exports = () => {
  // object -> byte
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // byte -> object
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
};
