const mongoose = require("mongoose");
const City = require("./models/cities");
const Restaurant = require("./models/restaurants");
const Review = require("./models/reviews");
const User = require("./models/users");
const { sample } = require("lodash")

const seedDB = (cityData, restaurantData, reviewData, userData) => {
    return mongoose.connection.dropDatabase()
    .then(()=> {
        return City.insertMany(cityData)
    })
    .then((cityDocs)=> {
        const newRestaurants = restaurantData.map(restaurant => {
            let cityId = Math.random()<0.5 ? null : sample(cityDocs)._id
        })
    })
}
