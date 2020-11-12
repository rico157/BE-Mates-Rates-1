const graphql = require('graphql');
const City = require('../models/cities');
const Restaurant = require('../models/restaurants');
const Review = require('../models/reviews');
const User = require('../models/users');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull
} = graphql;

// Creat City Schema

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

//  Create User Schema

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    avatarURL: { type: GraphQLString },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return Review.find({ user_id: parent.id });
      }
    },
    friends: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find().where('_id').in(parent.friends);
      }
    },
    wishlist: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        console.log(parent);
        return Restaurant.find().where('_id').in(parent.wishlist);
      }
    }
  })
});

// Create Review Schema

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    id: { type: GraphQLID },
    body: { type: GraphQLString },
    rating: { type: GraphQLInt },
    img: { type: GraphQLString },
    restaurant_id: {
      type: RestaurantType,
      resolve(parent, args) {
        return Restaurant.findById(parent.restaurant_id);
      }
    },
    user_id: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.user_id);
      }
    }
  })
});

// Create Restaurant Schema

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: { type: GraphQLString },
    cuisine: { type: GraphQLString },
    logo: { type: GraphQLString },
    address: {type: GraphQLString},
    information: {type: GraphQLString},
    city: {
      type: CityType,
      resolve(parent, args) {
        return City.findById(parent.city_id);
      }
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return Review.find({ restaurant_id: parent.id });
      }
    }
  })
});

// Create Query Schemas

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // GET single City
    city: {
      type: CityType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return City.findById(args.id);
      }
    },
    // Get all cities
    cities: {
      type: new GraphQLList(CityType),
      resolve(parent, args) {
        return City.find({});
      }
    },
    // GET single restaurant
    restaurant: {
      type: RestaurantType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Restaurant.findById(args.id);
      }
    },
    // GET all restaurants
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        return Restaurant.find({});
      }
    },
    // GET all reviews
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return Review.find({});
      }
    },
    // GET all users
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    },
    // GET Single User
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    }
  }
});

// Create Mutation Schemas

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // City POST Request
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
    // Restaurant POST request
    addRestaurant: {
      type: RestaurantType,
      args: {
        name: {
          type: GraphQLString
        },
        cuisine: {
          type: GraphQLString
        },
        address: {
          type: GraphQLString
        },
        information: {
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
          address: args.address,
          information: args.information,
          city_id: args.city_id
        });
        return restaurant.save();
      }
    },
    // User POST request
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        avatarURL: { type: GraphQLString },
        username: { type: GraphQLString }
        // friends: { type: GraphQLString }
      },
      resolve(parent, args) {
        let user = new User({
          name: args.name,
          avatarURL: args.avatarURL,
          username: args.username
          // friends: args.friend_id
        });
        return user.save();
      }
    },
    // PATCH Add friend to user
    addFriend: {
      type: UserType,
      args: {
        user_id: { type: GraphQLID },
        friend_id: { type: GraphQLString }
      },
      resolve(parent, { user_id, friend_id }) {
        return User.findByIdAndUpdate(
          user_id,
          {
            $push: { friends: friend_id }
          },
          { new: true }
        );
      }
    },
    // Review POST request
    addReview: {
      type: ReviewType,
      args: {
        body: { type: GraphQLString },
        rating: { type: GraphQLInt },
        img: { type: GraphQLString },
        restaurant_id: { type: GraphQLString },
        user_id: { type: GraphQLString }
      },
      resolve(parent, args) {
        let review = new Review({
          body: args.body,
          rating: args.rating,
          img: args.img,
          restaurant_id: args.restaurant_id,
          user_id: args.user_id
        });
        return review.save();
      }
    },
    // PATCH User
    updateUser: {
      type: UserType,
      args: {
        user_id: { type: new GraphQLNonNull(GraphQLID) },
        username: { type: GraphQLString },
        avatarURL: { type: GraphQLString },
        name: { type: GraphQLString }
      },
      resolve(parent, { user_id, username, avatarURL, name }) {
        const userToUpdate = User.findById(user_id);
        if (username) {
          userToUpdate.update({ username: username });
        }
        if (avatarURL) {
          userToUpdate.update({ avatarURL: avatarURL });
        }
        if (name) {
          userToUpdate.update({ name: name });
        }
        return userToUpdate;
        // const userToUpdate = User.findById(user_id);
        // Object.keys(input).forEach(value => {
        //   userToUpdate[value] = input[value]
        // });
        // const updatedUser = userToUpdate.save();
        // return updatedUser;
      }
    },
    // PATCH Review

    updateReview: {
      type: ReviewType,
      args: {
        review_id: { type: new GraphQLNonNull(GraphQLID) },
        body: { type: GraphQLString },
        rating: { type: GraphQLInt },
        img: { type: GraphQLString }
      },
      resolve(parent, { review_id, body, rating, img }) {
        const reviewToUpdate = Review.findById(review_id);
        if (body) {
          reviewToUpdate.update({ body: body });
        }
        if (rating) {
          reviewToUpdate.update({ rating: rating });
        }
        if (img) {
          reviewToUpdate.update({ img: img });
        }
        return reviewToUpdate;
      }
    },

    // DELETE User

    deleteUser: {
      type: UserType,
      args: {
        user_id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, { user_id }) {
        const deletedUser = User.findByIdAndRemove(user_id);
        return deletedUser;
      }
    },

    // DELETE Review

    deleteReview: {
      type: ReviewType,
      args: {
        review_id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, { review_id }) {
        const deletedReview = Review.findByIdAndRemove(review_id);
        return deletedReview;
      }
    },

    // POST Wishlist

    addWishlist: {
      type: UserType,
      args: {
        restaurant_id: { type: GraphQLString },
        user_id: { type: GraphQLID }
      },
      resolve(parent, { user_id, restaurant_id }) {
        return User.findByIdAndUpdate(
          user_id,
          {
            $push: { wishlist: restaurant_id }
          },
          { new: true }
        );
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
