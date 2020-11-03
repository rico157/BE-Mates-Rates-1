const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
// const bodyParser = require('body-parser');

const { rootResolver } = require('./resolvers/index');

mongoose
  .connect(
    `mongodb+srv://rico:Newyork757544@cluster0.9nchj.mongodb.net/mates_rates_app?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch(console.log);
mongoose.connection.once('open', () => {
  console.log('connected to the database');
});

const app = express();


// app.use(bodyParser.json())
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: rootResolver,
    graphiql: true
  })
);

app.listen(4000, () => console.log('Listening on port 4000'));
