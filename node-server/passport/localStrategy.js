const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../schemas/user");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        console.log("async local-strategy");
        try {
          const exUser = await User.findOne({ email: email });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              // coreect password
              done(null, exUser);
              console.log("correct password");
            } else {
              // incorrect password
              done(null, false, { message: "No correct password" });
              console.log("incoreect password");
            }
          } else {
            // no exist user
            done(null, false, { message: "No user" });
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
