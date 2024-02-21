const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { dataUsers }= require("../../model/dataUsers")

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

const JWTStrategy = new Strategy(option, async (payload, done) => {
  const targetUser = await dataUsers.find(
    (user) => user.username === payload.id
  );

  if (targetUser) {
    done(null, targetUser);
  } else {
    done(null, false);
  }
});

passport.use("jwt", JWTStrategy);
