const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schemaBackup");
const { rootResolver } = require("./resolvers/index");
const cors = require("cors");

mongoose
  .connect(
    `mongodb+srv://MCompton96:Newyork757544@cluster0.9nchj.mongodb.net/mates_rates_v2?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch(console.log);
mongoose.connection.once("open", () => {
  console.log("connected to the database");
});

const app = express();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    // rootValue: rootResolver,
    graphiql: true,
  })
);

app.listen(4000, () => console.log("Listening on port 4000"));
