import passport = require("koa-passport");
import userQueries from "../graphQLSchema/users/userQueries";
import hasher from "./hasher";

const initPassport = function() {
  passport.serializeUser(function(user: { email: String }, done: Function) {
    //the second arg is saved into the session and later used to get the user object
    done(null, user.email);
  });

  //recieve from Jeff
  passport.deserializeUser(async function(email: String, done: Function) {
    try {
      const user = await userQueries.findByEmail(email);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  const LocalStrategy = require("passport-local").Strategy;

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      async function(email: String, password: String, done: Function) {
        const user = await userQueries.findByEmail(email);
        if (!user) {
          done(null, false);
          return;
        }

        let passwordCorrect = await hasher.compare({
          hash: password,
          password: user.password
        });

        if (!passwordCorrect && password == user.password) {
          passwordCorrect = true;
        }

        if (email === user.email && passwordCorrect) {
          done(null, user);
        } else {
          done(null, false);
        }
      }
    )
  );
};

export default initPassport;
