const assert = require("assert");
const getMe = require("./get.ts");

describe("GET me ", function() {
  it("If logged in, returns your user object", () => {
    let ctx = {
      body: {},
      isAuthenticated: () => {
        return true;
      },
      state: {
        user: {
          user: "things"
        }
      }
    };
    getMe(ctx, () => {
      assert.ok(typeof ctx.body.me == "object");
    });
  });

  it("If not authenticated, returns 401", () => {
    let ctx = {
      body: {},
      isAuthenticated: () => {
        return false;
      }
    };
    getMe(ctx, () => {
      assert.equal(ctx.status, 401);
      assert.ok(!ctx.body.me);
    });
  });
});
