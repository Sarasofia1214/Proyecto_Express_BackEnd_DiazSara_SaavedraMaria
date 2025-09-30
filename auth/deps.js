import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { db } from '../utils/database.js';
import { JWT_SECRET } from './config.js';

// JWT Strategy options
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
};

// JWT Strategy
passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await db.collection('USUARIOS').findOne({ usuario: jwt_payload.usuario });
            if (user) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Usuario no encontrado' });
            }
        } catch (error) {
            return done(error, false);
        }
    })
);

// Middleware to authenticate using JWT
const getCurrentUser = passport.authenticate('jwt', { session: false });

export { getCurrentUser };
