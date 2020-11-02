const graphql = require('graphql');
const City = require('../models/cities');
const Restaurant = require('../models/restaurants');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLSchema
} = graphql;

const CityType = new GraphQLObjectType({
  name: 'City',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: { type: GraphQLString },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        return Restaurant.find({ city_id: parent.id });
      }
    }
  })
});

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: { type: GraphQLString },

    cuisine: { type: GraphQLString },
    city: {
      type: CityType,
      resolve(parent, args) {
        return City.findById(parent.city_id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    city: {
      type: CityType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return City.findById(args.id);
      }
    },
    restaurant: {
      type: RestaurantType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Restaurant.findById(args.id);
      }
    },
    cities: {
      type: new GraphQLList(CityType),
      resolve(parent, args) {
        return City.find({});
      }
    },
    restaurants: {
      type: new GraphQLList(CityType),
      resolve(parent, args) {
        return Restaurant.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCity: {
      type: CityType,
      args: {
        name: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        let city = new City({
          name: args.name
        });
        return city.save();
      }
    },
    addRestaurant: {
      type: RestaurantType,
      args: {
        name: {
          type: GraphQLString
        },
        cuisine: {
          type: GraphQLString
        },
        city_id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        let restaurant = new Restaurant({
          name: args.name,
          cuisine: args.cuisine,
          city_id: args.city_id
        });
        return restaurant.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
