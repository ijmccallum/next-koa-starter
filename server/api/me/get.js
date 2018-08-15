const userQueries = require("../users/userQueries.js");

const getMe = async (ctx, next) => {
  if (!ctx.isAuthenticated()) {
    ctx.status = 401;
  }
  if (ctx.isAuthenticated()) {
    if (!ctx.body) {
      ctx.body = {};
    }
    ctx.body.me = await userQueries.findById(ctx.state.user._id);
  }
  next();
};
module.exports = getMe;
