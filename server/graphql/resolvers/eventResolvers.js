/* eslint-disable no-unused-vars */
const { AuthenticationError, UserInputError } = require('apollo-server-koa');
const { validateId, validateNeededPeople, validateTitle } = require('../../validation');

module.exports = {
  Query: {
    event: async (parent, { id }, { models: { eventModel } }, info) => {
      if (!validateId(id)) {
        throw new UserInputError('Bad Id');
      }
      const event = await eventModel.findOne({ id });
      return event;
    },
  },

  Mutation: {
    createEvent: async (
      parent,
      { title, locations, nedeedPeople },
      { models: { locationModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      if (!validateNeededPeople(nedeedPeople)) {
        throw new UserInputError('Needed people must be between 1 and 100');
      }
      if (!validateTitle(title)) {
        throw new UserInputError('Title can\'t be emplt');
      }

      const event = locationModel.create({
        createdBy: me.id,
        title,
        nedeedPeople,
        people: [],
        locations,
        status: 'opened',
      });
      return event;
    },
    visitEvent: async (
      parent,
      { id },
      { models: { eventModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      if (!validateId(id)) {
        throw new UserInputError('Bad Id');
      }
      const event = await eventModel.findOne({ id });
      event.people.push(me.id);

      const updatedEvent = await eventModel.findOneAndUpdate(
        { id },
        { $set: event },
        { new: true }
      );
      return updatedEvent;
    },
    finishEvent: async (
      parent,
      { id },
      { models: { eventModel, userModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      if (!validateId(id)) {
        throw new UserInputError('Bad Id');
      }
      const event = await eventModel.findOne({ id });
      if (event) {
        event.status = 'closed';
        await Promise.all(
          [event.people].map(async userId => {
            const user = userModel.findOne({ id: userId });
            user.visited_events.push(id);
            await userModel.findOneAndUpdate(
              { _id: userId },
              {
                $set: user,
              },
              { new: true }
            );
          })
        );
      }

      const updatedEvent = await eventModel.findOneAndUpdate(
        { id },
        { $set: event },
        { new: true }
      );
      return updatedEvent;
    },
  },
};
