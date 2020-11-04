import express from 'express';
// const { graphqlHTTP } = require('express-graphql');
import mongoose from 'mongoose';
// const schema = require('../schema/schema');
const { ApolloServer, gql } = require('apollo-server-express');
import { typeDefs } from '../typeDefs';
import { resolvers } from '../resolvers';

// const { rootResolver } = require('./resolvers/index');

mongoose
  .connect(
    `mongodb+srv://rico:Newyork757544@cluster0.9nchj.mongodb.net/mates_rates_app?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch(console.log);
mongoose.connection.once('open', () => {
  console.log('connected to the database');
});

const server = new ApolloServer({
  typeDefs, 
  resolvers
})
const app = express();

server.applyMiddleware({ app })



// app.use(bodyParser.json())
// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema,
//     rootValue: rootResolver,
//     graphiql: true
//   })
// );

app.listen(4000, () => console.log('Listening on port 4000'));
