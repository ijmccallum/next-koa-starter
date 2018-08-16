import mongoose = require("mongoose");
function mconnect() {
  mongoose.connect("mongodb://localhost/starter");
}

const connect = function() {
  if (process.env.NODE_ENV !== "test") {
    mongoose.connection
      .on("error", err => {
        console.log("error", err);
        setTimeout(function() {
          mconnect();
        }, 3000);
      })
      .on("disconnected", () => {
        console.log("disconnected");
      })
      .once("open", () => {
        console.log("connected!!");
        // dbSeed();
      });

    mconnect();
  }
};

export default connect;
