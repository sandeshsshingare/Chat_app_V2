const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://sandeshshingare12:sandesh@cluster0.mkvm3es.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      dbName: "chat-app",
    }
  )
  .then((conn) => {
    console.log("DB connection successfully...");
  });