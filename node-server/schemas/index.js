const mongoose = require("mongoose");
const dotenv = require("dotenv");

// donenv setup
dotenv.config();

// connect MongoDB
const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose.connect(
    process.env.MONGO_URI,
    {
      dbName: "asg",
      useNewUrlParser: true,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.log("Connect error MongoDB");
      } else {
        console.log("Connect success MongoDB");
      }
    }
  );
};

mongoose.connection.on("error", (err) => {
  console.error("Connect error MongoDB");
});

mongoose.connection.on("disconnected", () => {
  console.error("Connect error MongoDB. Reconnect...");
  connect();
});

module.exports = connect;
