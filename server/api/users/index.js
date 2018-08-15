const router = require("koa-router")();
require("./userSchema.js"); //runs on require?

router
  .post("/api/users/", require("./post.js"))
  .get("/api/users/", require("./get.js"))
  .delete("/api/users/", require("./delete.js"));

module.exports = router;
