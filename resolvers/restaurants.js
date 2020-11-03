const Restaurant = require('../models/restaurants');
const mongoose = require('mongoose');
const restaurantResolvers = {
  restaurants: () => {
    return Restaurant.find()
    .populate('city')
    .populate('reviews')
    .then((result) => {
      console.log(result)
      return result
    })
  },
  restaurantById: ({ id }) => {
    const mongooseID = mongoose.Types.ObjectId(id);
    return Restaurant.findById(mongooseID)
    .populate('city')
    .populate('reviews')
    .then((result) => {
      return result
    })
  },
  createRestaurant: ({ restaurantInput }) => {
    const newRestaurant = new Restaurant({
      name: restaurantInput.name,
      img: restaurantInput.img,
      cuisine: restaurantInput.cuisine
    })
    return newRestaurant.save();
  },
  updateRestaurant: ({ id, restaurantInput }) => {
    const mongooseID = mongoose.Types.ObjectId(id);
    return Restaurant.findByIdAndUpdate(mongooseID, restaurantInput)
  }
};

module.export = { restaurantResolvers };
