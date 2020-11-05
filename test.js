
const {filterRestaurant} = require("./utils")

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
    it("returns what we want it to return", () => {
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
})