const passport = require("passport");
const LocalStratey = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../schemas/user");

module.exports = () => {
  passport.use(
    new LocalStratey(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, esUser);
            } else {
              done(null, false, { message: "No correct password" });
            }
          } else {
            done(null, false, { message: "No User" });
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
