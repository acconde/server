import { use } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Users from '../models/User';

/*************************** Local Strategy ***************************/
use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  Users.findOne({ email })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));
