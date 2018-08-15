var router = require("koa-router")();
const login = require("./login.ts");
const logout = require("./logout.ts");

// /api/auth
router.post("/api/auth/login", login);
router.post("/api/auth/logout", logout);

module.exports = router;
