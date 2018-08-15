var mongoose = require("mongoose");
const dbSeed = require("./db/seed.js");

const initConnection = function() {
  function connect() {
    mongoose.connect(process.env.MONGODB_CONNECTION_URL);
  }

  if (process.env.NODE_ENV !== "test") {
    mongoose.connection
      .on("error", err => {
        console.log("error", err);
        setTimeout(function() {
          connect();
        }, 3000);
      })
      .on("disconnected", () => {
        console.log("disconnected");
      })
      .once("open", () => {
        console.log("connected!!");
        dbSeed();
      });

    connect();
  }
};

module.exports = initConnection;
