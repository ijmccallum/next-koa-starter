import passport = require("koa-passport");
import userQueries from "../graphQLSchema/users/userQueries";
import hasher from "./hasher";
import { UserInterface } from "../graphQLSchema/users/userModel";

const initPassport = function() {
  passport.serializeUser(function(user: UserInterface, done: Function) {
    //the second arg is saved into the session and later used to get the user object
    done(null, user.email);
  });

  //recieve from Jeff
  passport.deserializeUser(async function(email: String, done: Function) {
    try {
      //TODO: assign promise response to user in one line?
      let res = await userQueries.findByEmail(email);
      const user = <UserInterface>res;
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
        let res = await userQueries.findByEmail(email);
        const user = <UserInterface>res;
        if (!user) {
          done(null, false);
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
