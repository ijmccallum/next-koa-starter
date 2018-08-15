var router = require("koa-router")();
const login = require("./login.js");
const logout = require("./logout.js");

// /api/auth
router.post("/api/auth/login", login);
router.post("/api/auth/logout", logout);

module.exports = router;
