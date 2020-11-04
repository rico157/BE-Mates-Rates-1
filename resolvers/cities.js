const City = require('../models/cities');
const mongoose = require('mongoose');
const cityResolvers = {
  cities: () => {
    return City.find()
      .populate('restaurants')
      .then((res) => res);
  },
  cityById: ({ id }, args) => {
    return City.findById(id)
      .populate('restaurants')
      .then((res) => res);
  }
};

module.export = { cityResolvers };
