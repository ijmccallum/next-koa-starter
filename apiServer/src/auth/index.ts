import Router = require("koa-router");
import login from "./login";
import logout from "./logout";

const router = new Router();

// /api/auth
router.post("/api/auth/login", login);
router.post("/api/auth/logout", logout);

module.exports = router;
