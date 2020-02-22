const userResolver = require('./userResolvers');
const locationResolver = require('./locationResolvers');
const eventResolver = require('./eventResolvers');

module.exports = [userResolver, locationResolver, eventResolver];
