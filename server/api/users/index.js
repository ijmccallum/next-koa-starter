const router = require("koa-router")();
const postUser = require("./post.js");
const getUsers = require("./get.js");
const deleteUsers = require("./delete.js");
require("./userSchema.js"); //runs on require?

router
  .post("/api/users/", postUser)
  .get("/api/users/", getUsers)
  .delete("/api/users/", deleteUsers);

module.exports = router;
