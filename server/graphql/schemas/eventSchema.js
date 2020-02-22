const { gql } = require('apollo-server-koa');

module.exports = gql`
  type Event {
    _id: ID!
    title: String!
    createdBy: User!
    people: [User!]!
    neededPeople: Int!
    locations: [Location!]!
    status: String!
  }
  type Response {
    statusCode: Int!
  }

  extend type Query {
    event(id: ID!): Event!
  }

  extend type Mutation {
    createEvent(title: String!, neededPeople: Int!, locations: [ID]!): Event!
    visitEvent(id: ID!): Event!
    finishEvent(id: ID!): Response!
  }
`;
