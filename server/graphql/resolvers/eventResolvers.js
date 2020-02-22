/* eslint-disable no-unused-vars */
const { AuthenticationError, UserInputError } = require('apollo-server-koa');
const {
  validateId,
  validateNeededPeople,
  validateTitle,
} = require('../../validation');

module.exports = {
  Query: {
    event: async (parent, { id }, { models: { eventModel } }, info) => {
      if (!validateId(id)) {
        throw new UserInputError('Bad Id');
      }
      const event = await eventModel.findOne({ _id: id });
      return event;
    },
  },

  Mutation: {
    createEvent: async (
      parent,
      { title, locations, neededPeople },
      { models: { eventModel, locationModel, userModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      //validation needed
      // if (!validateNeededPeople(neededPeople)) {
      //   throw new UserInputError('Needed people must be between 1 and 100');
      // }
      // if (!validateTitle(title)) {
      //   throw new UserInputError("Title can't be emplt");
      // }

      const event = await eventModel.create({
        createdBy: me.id,
        title,
        needed_people: neededPeople,
        people: [],
        locations,
        status: 'opened',
      });

      //first elem only
      await Promise.all(
        locations.map(async locationId => {
          return await locationModel.findOneAndUpdate(
            { _id: locationId },
            { $set: { status: 'dirty with event' } }
          );
        })
      );

      await userModel.findOneAndUpdate(
        { _id: me.id },
        { $push: { created_events: event._id } }
      );

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

      const updatedEvent = await eventModel.findOneAndUpdate(
        { _id: id },
        { $push: { people: me.id } }
      );

      return updatedEvent;
    },
    finishEvent: async (
      parent,
      { id },
      { models: { eventModel, userModel, locationModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      if (!validateId(id)) {
        throw new UserInputError('Bad Id');
      }
      const event = await eventModel.findOne({ _id: id });
      if (event) {
        event.status = 'closed';
        const { people, locations } = event;
        //обрабатывает первый эл
        await Promise.all(
          people.map(async userId => {
            return await userModel.findOneAndUpdate(
              { _id: userId },
              { $push: { visited_events: id } }
            );
          })
        );
        //обрабатывает первый эл

        await Promise.all(
          locations.map(async locationId => {
            return await locationModel.findOneAndUpdate(
              { _id: locationId },
              { $set: { status: 'clean' } }
            );
          })
        );
      }

      const updatedEvent = await eventModel.findOneAndUpdate(
        { _id: id },
        { $set: event },
        { new: true }
      );
      if (updatedEvent) {
        return { statusCode: 200 };
      }
    },
  },
};
