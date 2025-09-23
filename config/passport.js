import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import UserModel from "../models/UserModel.js";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // "Authorization: Bearer <token>"
  secretOrKey: process.env.JWT_SECRET,
};

// Estrategia JWT
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const userModel = new UserModel();
      const user = await userModel.findById(jwt_payload.id);

      if (user) {
        return done(null, user); // Usuario encontrado → req.user
      } else {
        return done(null, false); // Usuario no existe
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
