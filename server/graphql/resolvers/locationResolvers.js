/* eslint-disable no-unused-vars */
const { AuthenticationError, UserInputError } = require('apollo-server-koa');
const {
  validateId,
  validatePoint,
  validatePoints,
} = require('../../validation');

module.exports = {
  Query: {
    location: async (
      parent,
      { id },
      { models: { locationModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      if (!validateId(id)) {
        throw new UserInputError('Bad Id');
      }
      const location = await locationModel.findOne({ _id: id });
      return location;
    },
    getSomeLocations: async (
      parent,
      { points },
      { models: { locationModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      if (!validatePoints(points)) {
        throw new UserInputError('Point is invalid');
      }
      const locations = await locationModel
        .find()
        .where('location')
        .in(points)
        .exec();
      if (locations) {
        return locations;
      }
    },
  },

  Mutation: {
    markLocation: async (
      parent,
      { title, point, description },
      { models: { locationModel, userModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      if (!validatePoint(point)) {
        throw new UserInputError('Point is invalid');
      }

      const location = await locationModel.create({
        offeredBy: me.id,
        title,
        location: point,
        description,
        status: 'dirty without event',
      });
      await userModel.findOneAndUpdate(
        { _id: me.id },
        { $push: { added_locations: location._id } }
      );
      return location;
    },
  },
};
