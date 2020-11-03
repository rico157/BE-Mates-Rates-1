const Restaurant = require('../models/restaurants');
const mongoose = require('mongoose');
const restaurantResolvers = {
  restaurants: () => {
    return Restaurant.find({});
  },
  restaurantById: ({ id }, args) => {
    return Restaurant.findById(id);
  }
};

module.export = { restaurantResolvers };
