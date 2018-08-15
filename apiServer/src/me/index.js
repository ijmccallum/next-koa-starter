const router = require("koa-router")();
const get = require("./get.ts");
router.get("/api/me/", get);
module.exports = router;
//# sourceMappingURL=index.js.map