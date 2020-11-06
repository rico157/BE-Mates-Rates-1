
const { it, expect } = require("@jest/globals")
const {filterRestaurant, filterReviews} = require("./utils")

describe("filterRestaurant tests", () => {
    it("does not mutate original restaurant data", () => {
        const restaurantInput = [{
            restaurant_name: "turtle_bay",
            city_name: "Manchester",
            cuisine: "Carribean"
            },
            {
            restaurant_name: "pizza expresss",
            city_name: "Altrincham",
            cuisine: "Italian"  
            }
        ]
        const cityInput = [{
            _id: 123456,
            name: "Manchester"
        }]
        const output = filterRestaurant(restaurantInput, cityInput);
        expect(restaurantInput).toEqual([{
            restaurant_name: "turtle_bay",
            city_name: "Manchester",
            cuisine: "Carribean"
            },
            {
            restaurant_name: "pizza expresss",
            city_name: "Altrincham",
            cuisine: "Italian"  
            }
        ])
    })
    it("will replace the city name with the city ID", () => {
        const restaurantInput = [{
            restaurant_name: "turtle_bay",
            city_name: "Manchester",
            cuisine: "Carribean"
            },
            {
            restaurant_name: "pizza expresss",
            city_name: "Manchester",
            cuisine: "Italian"  
            }
        ]
        const cityInput = [{
            _id: 123456,
            name: "Manchester"
        }]
        const output = filterRestaurant(restaurantInput, cityInput)
        expect(output).toEqual([{
            restaurant_name: "turtle_bay",
            city_id: 123456,
            cuisine: "Carribean"
            },
            {
            restaurant_name: "pizza expresss",
            city_id: 123456,
            cuisine: "Italian"  
            }
        ])
    })
    it("filter reviews tests", () => {
        const restaurantInput = [{
            _id: 354,
            name: "pizza express",
            city_name: "Manchester",
            cuisine: "Carribean"
            },
        ]
        const reviewInput = [{
            user_name: "Ben",
            body: "not bad",
            rating: 3,
            restaurant_name: "pizza express"
        }]
        const userInput = [{
            name: "Ben",
            _id: 3789,
        }]
        const output = filterReviews(reviewInput, restaurantInput, userInput)
        expect(output).toEqual([{
            user_id: 3789,
            body: "not bad",
            rating: 3,
            restaurant_id: 354
        }])
    })
})
