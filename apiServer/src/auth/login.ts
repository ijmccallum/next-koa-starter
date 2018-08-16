import passport = require("koa-passport");
// import userQueries from "../users/userQueries";

const postLogin = async ctx => {
  // const user = await userQueries.findByEmail(ctx.request.body.email);

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

export default postLogin;
