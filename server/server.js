const Koa = require("koa");
const { parse } = require("url");
const next = require("next");
const Router = require("koa-router");
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
require("./api/auth/passport.js");
const passport = require("koa-passport");
koaServer.use(passport.initialize());
koaServer.use(passport.session());

// next
nextApp.prepare().then(() => {
  const router = new Router();

  // NEXT ISOMORPHIC ROUTES
  router.get("/blog/:slug", async ctx => {
    const mergedQuery = Object.assign({}, req.query, req.params);
    await nextApp.render(req, res, "/blog", mergedQuery);
    ctx.respond = false;
  });

  // API ROUTES
  koaServer
    .use(require("./api/auth").routes())
    .use(require("./api/me").routes())
    .use(require("./api/locales").routes())
    .use(require("./api/users").routes());

  // THIS IS THE DEFAULT ROUTE, DON'T EDIT THIS
  router.get("*", async ctx => {
    console.log("* route");
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  koaServer.use(router.routes()).use(router.allowedMethods());

  koaServer.use(async (ctx, next) => {
    console.log("statuscode");
    ctx.res.statusCode = 200;
    await next();
  });

  const port = process.env.PORT || 3000;
  koaServer.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on port ${port}...`);
  });
});
