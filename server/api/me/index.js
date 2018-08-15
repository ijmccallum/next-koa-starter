const router = require("koa-router")();
const get = require("./get.js");

router.get("/api/me/", get);

module.exports = router;
