module.exports = function() {
  const mongoose = require("mongoose");
  const config = require("config");
  mongoose.set("useCreateIndex", true);
  mongoose
    .connect("mongodb://localhost/" + config.get("DataBase_Name"), {
      useNewUrlParser: true
    })
    .then(() => {
      console.log("DB connection successfully");
    })
    .catch(err => {
      console.log("DB connection fail..");
    });
};
