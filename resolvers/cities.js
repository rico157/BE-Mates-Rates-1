const City = require('../models/cities');
const mongoose = require('mongoose');

const cityResolvers = {
  cities: () => {
    return City.find()
      .populate('restaurants')
      .then((result) => {
        return result;
      });
  },
  cityById: ({ id }) => {
    const mongooseID = mongoose.Types.ObjectId(id);
    return City.findById(mongooseID)
    .populate('restaurants')
    .then((result) => {
      return result;
    });
  },
  createCity: ({ cityInput }) => {
    const newCity = new City({
      name: cityInput.name
    })
    console.log(newCity);
    return newCity.save();
  }
}

module.export = { cityResolvers };
