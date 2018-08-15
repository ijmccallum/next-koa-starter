const userQueries = require("./userQueries.ts");

const getUsers = async (ctx, next) => {
  if (!ctx.isAuthenticated()) {
    ctx.status = 401;
  }
  if (ctx.isAuthenticated()) {
    if (!ctx.body) {
      ctx.body = {};
    }
    ctx.body.users = await userQueries.findAll();
  }

  next();
};
module.exports = getUsers;
