const assert = require("assert");
const postUser = require("./post.js");

describe("POST user ", function() {
  it("calls the user creation ... method? module?", () => {
    let ctx = {
      body: {},
      isAuthenticated: () => {
        return true;
      }
    };
    postUser(ctx, () => {
      assert.ok(ctx.body.user);
    });
  });

  it("If not authenticated, returns 401", () => {
    let ctx = {
      body: {},
      isAuthenticated: () => {
        return false;
      }
    };
    postUser(ctx, () => {
      assert.equal(ctx.status, 401);
      assert.ok(!ctx.body.user);
    });
  });
});
