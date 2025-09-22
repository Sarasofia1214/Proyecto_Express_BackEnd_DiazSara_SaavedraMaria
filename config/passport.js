// src/config/passport.js
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const db = getDB();
      const user = await db.collection("users").findOne({ _id: new ObjectId(payload.id) });
      if (!user) return done(null, false);
      delete user.password;
      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  })
);

export default passport;
