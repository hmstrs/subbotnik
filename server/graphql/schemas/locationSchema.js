const { gql } = require('apollo-server-koa');

module.exports = gql`
  type Location {
    _id: ID!
    title: String!
    offeredBy: User!
    description: String!
    location: String!
    status: String!
  }
  extend type Query {
    location(id: ID!): Location!
    getSomeLocations(points: [String!]): [Location!]!
  }

  extend type Mutation {
    markLocation(
      title: String!
      description: String!
      point: String!
    ): Location!
  }
`;
