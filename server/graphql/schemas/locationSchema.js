const { gql } = require('apollo-server-koa');

module.exports = gql`
  type Location {
    id: ID!
    title: String!
    offeredBy: User!
    description: String!
    location: String!
    status: Sting!
  }
  extend type Query {
  location:(id:ID!): Location!
  getSomeLocations: (points: [String!]): [Location!]!
  }

  extend type Mutation {
   markLocation: (title: String!, point:String!): Location!,
  }
`;
