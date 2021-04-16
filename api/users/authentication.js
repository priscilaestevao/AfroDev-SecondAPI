const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const User = require("./User");
const InvalidLogin = require("../errors/InvalidLogin");
const NotFound = require("../errors/NotFound");

function checkUser(user) {
  if (!user) {
    throw new NotFound("User");
  }
}

async function checkPassword(password, passwordHash) {
  const correctPassword = await bcrypt.compare(password, passwordHash);
  if (!correctPassword) {
    throw new InvalidLogin();
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = new User({ email: email });
        await user.searchByEmail();
        checkUser(user.id);
        await checkPassword(password, user.password);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY);
      const user = new User({ id: payload.id });
      await user.searchById;
      done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

module.exports = {
  passport: passport,
};
