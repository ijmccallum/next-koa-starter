const assert = require("assert");
const getUsers = require("./get.ts");

describe("GET users ", function() {
  it("If authenticated, adds an array of users to the return object", () => {
    let ctx = {
      body: {},
      isAuthenticated: () => {
        return true;
      }
    };
    getUsers(ctx, () => {
      assert.ok(ctx.body.users.length);
    });
  });

  it("If not authenticated, returns 401", () => {
    let ctx = {
      body: {},
      isAuthenticated: () => {
        return false;
      }
    };
    getUsers(ctx, () => {
      assert.equal(ctx.status, 401);
      assert.ok(!ctx.body.users);
    });
  });
});
