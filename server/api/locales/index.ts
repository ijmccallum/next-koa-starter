const router = require("koa-router")();
const get = require("./get.ts");

router.get("/api/locales/:lng", get);

module.exports = router;
