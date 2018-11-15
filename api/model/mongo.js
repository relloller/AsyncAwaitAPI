"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.set("useCreateIndex", true);
mongoose
  .connect("mongodb://localhost/AsyncAwaitAPI", { useNewUrlParser: true })
  .then(() => console.log("AsyncAwaitAPI db connection successful"))
  .catch(err => console.error("AsyncAwaitAPI db connection error", err));

process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log("disconnected AsyncAwaitAPI db");
    process.exit(0);
  });
});
