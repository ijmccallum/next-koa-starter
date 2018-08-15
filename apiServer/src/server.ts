import * as Koa from "koa";
import * as Router from "koa-router";
const { parse } = require("url");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const koaServer = new Koa();

require("pretty-error").start();
require("dotenv").config();

// cors
const cors = require("@koa/cors");
koaServer.use(cors());
koaServer.proxy = true;

// sessions
const session = require("koa-session");
koaServer.keys = ["your-session-secret"];
koaServer.use(session({}, koaServer));

// body
const bodyParser = require("koa-bodyparser");
koaServer.use(bodyParser());

// authentication
require("./api/auth/passport");
const passport = require("koa-passport");
koaServer.use(passport.initialize());
koaServer.use(passport.session());

const router = new Router();

// API ROUTES
koaServer
  .use(require("./api/auth").routes())
  .use(require("./api/me").routes())
  .use(require("./api/locales").routes())
  .use(require("./api/users").routes());

koaServer.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3000;
koaServer.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on port ${port}...`);
});
