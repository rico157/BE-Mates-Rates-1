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
    city: City
    img: String
    cuisine: String
    reviews: [Review]
  }

  type Review {
    _id: ID!
    body: String
    rating: Float
    user: User
    restaurant: Restaurant
  }

  type User {
    _id: ID!
    name: String
    username: String
    avatarURL: String
  }

  type RootQuery {
    cities: [City!]
    cityById(id: ID!): City!
    restaurants: [Restaurant!]
    restaurantById(id: ID!): Restaurant!
    users: [User!]
    userById(id: ID!): User!
    reviews: [Review!]
    reviewById(id: ID!): Review!
  }

  input UserInput {
    name: String!
    username: String!
    avatarURL: String!
  }

  input RestaurantInput {
    name: String!
    cuisine: String!
    img: String
    city_id: String!
  }

  input ReviewInput {
    body: String!
    rating: Float!
    restaurant_name: String!
    user_id: String!
  }

  input CityInput {
    name: String!
  }

  type RootMutation {
    createUser(userInput: UserInput!): User!
    createRestaurant(restaurantInput: RestaurantInput!): Restaurant!
    updateUser(id: ID!, userInput: UserInput!): User!
    updateRestaurant(id: ID!, restaurantInput: RestaurantInput!): Restaurant!
    createReview(reviewInput: ReviewInput!): Review!
    updateReview(id: ID!, reviewInput: ReviewInput!): Review!
    createCity(cityInput: CityInput!): City!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = schema;
