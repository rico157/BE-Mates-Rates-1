import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type City {
        id: ID!
        name: String!
    }

    type Mutation {
        createCity(name: String!): City!
    }
`;