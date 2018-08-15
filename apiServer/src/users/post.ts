const hasher = require("../auth/hasher.ts");
const userQueries = require("./userQueries.ts");

const postUser = async (ctx, next) => {
  //create a user, seed their todos array with the boilerplate todos
  if (!ctx.isAuthenticated()) {
    ctx.status = 401;
  }
  if (ctx.isAuthenticated()) {
    if (!ctx.request.body.email || !ctx.request.body.password) {
      ctx.body = {
        error: "an email / password are required to create a new user"
      };
      ctx.status = 400;
    } else {
      const newUserData = {
        email: ctx.request.body.email,
        password: hasher.hash(ctx.request.body.password)
      };
      if (ctx.request.body.name) {
        newUserData.name = ctx.request.body.name;
      }
      if (ctx.request.body.email) {
        newUserData.name = ctx.request.body.email;
      }

      try {
        const newUser = await userQueries.create(newUserData);

        ctx.body = {
          user: newUser
        };
      } catch (err) {
        ctx.body = {
          err: err
        };
        ctx.status = 500;
      }
    }
  }
  next();
};
module.exports = postUser;
