const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const password = require('./data');


mongoose.connect(`mongodb+srv://MCompton96:${password}@cluster0.9nchj.mongodb.net/mates_rates_app?retryWrites=true&w=majority`);
mongoose.connection.once('open', () => {
    console.log('connected to the database');
})

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => console.log('Listening on port 4000'));
