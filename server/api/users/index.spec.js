const assert = require("assert");
const userRouter = require("./index.js");

describe("/todos ", function() {
  it("returns a router listening to /todos", () => {
    assert.equal(userRouter.stack[0].path, "/users");
  });
  it("the /todos router has a POST method", () => {
    assert.ok(userRouter.stack[0].methods.includes("POST"));
  });
});
