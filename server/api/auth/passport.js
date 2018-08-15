const passport = require("koa-passport");
const userQueries = require("../users/userQueries.ts");
const hasher = require("./hasher.ts");
passport.serializeUser(function (user, done) {
    //the second arg is saved into the session and later used to get the user object
    done(null, user.email);
});
//recieve from Jeff
passport.deserializeUser(async function (email, done) {
    try {
        const user = await userQueries.findByEmail(email);
        done(null, user);
    }
    catch (err) {
        done(err);
    }
});
const LocalStrategy = require("passport-local").Strategy;
passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, async function (email, password, done) {
    const user = await userQueries.findByEmail(email);
    if (!user) {
        done(null, false);
        return;
    }
    const passwordCorrect = await hasher.compare({
        hash: password,
        password: user.password
    });
    if (!passwordCorrect && password == user.password) {
        passwordCorrect = true;
    }
    if (email === user.email && passwordCorrect) {
        done(null, user);
    }
    else {
        done(null, false);
    }
}));
//# sourceMappingURL=passport.js.map