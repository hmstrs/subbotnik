const { gql } = require('apollo-server-koa');

module.exports = gql`
  type User {
    id: ID!
    nickname: String!
    email: String!
    score: Int!
    visited_events: [Events!]!
    created_events: [Events!]!
    added_locations: [Location!]!
  }
  type Token {
    token: String!
  }

  extend type Query {
    user(id: ID!): User!
    login(email: String!, password: String!): Token!
  }

  extend type Mutation {
    createUser(nickname: String!, password: String!, email: String!): User!
    resetPassword(email: String!): Boolean!
  }
`;
