const { buildSchema } = require('graphql');
const schema = buildSchema(`
  type City {
    _id: ID!
    name: String!
    restaurants: [Restaurant]
  }

  type Restaurant {
    _id: ID!
    name: String
    city: String
    
    img: String
    cuisine: String
  }

  type RootQuery {
    cities: [City!]
    cityById(id: ID!): City!
    restaurants: [Restaurant!]
    restaurantById(id: ID!): Restaurant!
  }
`);

module.exports = schema;
