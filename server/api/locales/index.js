const router = require("koa-router")();
const get = require("./get.js");

router.get("/api/locales/:lng", get);

module.exports = router;
