const mongoose = require("mongoose");
const seedDb = require("./seed");

mongoose
  .connect(
    `mongodb+srv://MCompton96:Newyork757544@cluster0.9nchj.mongodb.net/mates_rates_app?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    seedDb();
  });
