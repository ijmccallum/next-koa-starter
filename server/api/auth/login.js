const passport = require("koa-passport");
const userQuerires = require("../users/userQueries.js");

const postLogin = async (ctx, next) => {
  const user = await userQuerires.findByEmail(ctx.request.body.email);

  return passport.authenticate("local", (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.body = {
        _id: user._id,
        name: user.name,
        email: user.email
      };
    } else {
      ctx.body = { status: "error" };
    }
  })(ctx);
};

module.exports = postLogin;
