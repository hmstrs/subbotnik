const { gql } = require('apollo-server-koa');

module.exports = gql`
  type Event {
    id: ID!
    title: String!
    createdBy: User!
    people:[User!]!
    nedeedPeople: Int!
    locations: [Location!]!
    status: String!
  }
  type Response: {
    statusCode: Int!,
  }

  extend type Query {
  event:(id:ID!): Event!
  }

  extend type Mutation {
  createEvent: (title: String!,nedeedPeople:Int!, locations:[Location]!): Event!,
  visitEvent: (id: ID!): Event!,
  finishEvent: (id: ID!): Response!
  }
`;
