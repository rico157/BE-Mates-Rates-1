const { rest } = require("lodash")

exports.filterRestaurant = (restaurantData, cityData) => {
    const copyRestaurant = [...restaurantData];
    const thirdRestaurant = copyRestaurant.map(restaurant => {
        const city = cityData.filter(city => city["name"] === restaurant["city_name"])
        if(!city.length) return restaurant
        const newRestaurant = {...restaurant}
        newRestaurant["city_id"] = city[0]["_id"]
        delete newRestaurant["city_name"]
        return newRestaurant
    })
    return thirdRestaurant
}