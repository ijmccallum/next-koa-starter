const assert = require("assert");
const userRouter = require("./index.js");

describe("/api/users ", function() {
  it("returns a router listening to /api/users/", () => {
    assert.equal(userRouter.stack[0].path, "/api/users/");
  });
  it("the /api/users router has the relevent methods", () => {
    //router.stack is each method added to the router to handle different actions
    let routeMethods = [];
    userRouter.stack.forEach(stackItem => {
      routeMethods.push(...stackItem.methods);
    });

    assert.ok(routeMethods.includes("POST"));
    assert.ok(routeMethods.includes("GET"));
    assert.ok(routeMethods.includes("DELETE"));
  });
});
