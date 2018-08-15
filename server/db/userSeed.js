const userQueries = require("../users/userQueries.js");
const hasher = require("../hasher");

/**
 * on startup check if there's data in the db,
 * if not, put some basics in there
 *
 *
 */

module.exports = async () => {
  let testUser = await userQueries.findByEmail("test@test.com");
  if (testUser) {
    return;
  }

  testUser = await userQueries.create({
    name: "Mr test",
    email: "test@test.com",
    password: await hasher.hash("test")
  });
};
