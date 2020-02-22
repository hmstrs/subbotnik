const userSchema = require('./userSchema');
const locationSchema = require('./locationSchema');
const eventSchema = require('./eventSchema');
const { gql } = require('apollo-server-koa');

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

module.exports = [linkSchema, locationSchema, userSchema, eventSchema];
