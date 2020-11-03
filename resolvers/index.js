const { cityResolvers } = require('./cities');
const { restaurantResolvers } = require('./restaurants');
const { reviewResolvers } = require('./reviews');
const { userResolvers } = require('./users');

const rootResolver = { 
    ...cityResolvers, 
    ...restaurantResolvers,
    ...reviewResolvers,
    ...userResolvers
};

module.exports = { rootResolver };
