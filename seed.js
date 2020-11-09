const mongoose = require("mongoose");
const City = require("./models/cities");
const Restaurant = require("./models/restaurants");
const Review = require("./models/reviews");
const User = require("./models/users");
const { sample } = require("lodash");
const { filterRestaurant, filterReviews, formatBelongsTo } = require("./utils");
const {
  restaurantData,
  cityData,
  userData,
  reviewData,
} = require("./data/index");

const seedDB = () => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return City.insertMany(cityData);
    })
    .then((cityDocs) => {
      const newRestaurantData = filterRestaurant(restaurantData, cityDocs);
      return Promise.all([
        Restaurant.insertMany(newRestaurantData),
        User.insertMany(userData),
      ]);
    })
    .then((res) => {
      const newReviewData = filterReviews(reviewData, res[0], res[1]);
      return Review.insertMany(newReviewData);
    });
};

module.exports = seedDB;
