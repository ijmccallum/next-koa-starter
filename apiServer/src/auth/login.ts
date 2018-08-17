import passport = require("koa-passport");
// import userQueries from "../users/userQueries";

const postLogin = async (ctx: any, next: any) => {
  // const user = await userQueries.findByEmail(ctx.request.body.email);

  const authResHandler = (
    err: Error,
    user: { id: String; username: String; email: String }
  ) => {
    if (err) {
      throw err;
    }
    if (user) {
      ctx.login(user);
      ctx.body = {
        id: user.id,
        username: user.username,
        email: user.email
      };
    } else {
      ctx.body = { status: "error" };
    }
  };

  return passport.authenticate("local", authResHandler)(ctx, next);
};

export default postLogin;
