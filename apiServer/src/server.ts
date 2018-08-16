import Koa = require("koa");
import Router = require("koa-router");

const koaServer = new Koa();

import * as prettyError from "pretty-error";
prettyError.start();

import dotenv = require("dotenv");
dotenv.config();

// cors
import cors = require("@koa/cors");
koaServer.use(cors());
koaServer.proxy = true;

// sessions
import session = require("koa-session");
koaServer.keys = ["your-session-secret"];
koaServer.use(session({}, koaServer));

// body
import bodyParser = require("koa-bodyparser");
koaServer.use(bodyParser());

// authentication
import initPassport from "./auth/passport";
initPassport();
import passport = require("koa-passport");
koaServer.use(passport.initialize());
koaServer.use(passport.session());

const router = new Router();
router.get("/*", async ctx => {
  ctx.body = "hi";
});

// API ROUTES
// koaServer
//   .use(require("./api/auth").routes())
//   .use(require("./api/me").routes())
//   .use(require("./api/locales").routes())
//   .use(require("./api/users").routes());

koaServer.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3000;
koaServer.listen(port, () => {
  console.log(`> Ready on port ${port}...`);
});

koaServer.on("error", (err: any) => {
  throw err;
});
