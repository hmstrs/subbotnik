const validateLogin = require('./validateLogin');
const validateRegister = require('./validateRegister');
const validateRecover = require('./validateRecover');
const validateLocation = require('./validateLocation');
const validateId = require('./validateId');
const validatePoint = require('./validatePoint');
const validatePoints = require('./validatePoints');
const validateNeededPeople = require('./validateNeededPeople');
const isEmpty = require('./validator');

module.exports = {
  validateLogin,
  validateRegister,
  validateRecover,
  validateId,
  validatePoint,
  validatePoints,
  validateNeededPeople,
  validateLocation,
  validateTitle: isEmpty,
};
