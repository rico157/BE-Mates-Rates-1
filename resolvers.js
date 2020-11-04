import City from './models/cities';

export const resolvers = {
    Query: {
        cities: () => City.find(),
        cityById: ({ id }) => City.findById(id)
    },
    
    Mutation: {
        createCity: (_, { name }) => {
            const city = new City({ name });
            return city.save()
        }
    }
}