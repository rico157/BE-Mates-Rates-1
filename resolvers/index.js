const { cityResolvers } = require('./cities');
const { restaurantResolvers } = require('./restaurants');

const rootResolver = { ...cityResolvers, ...restaurantResolvers };

module.exports = { rootResolver };
