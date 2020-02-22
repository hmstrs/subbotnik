'use strict';

const validatePoint = require('./validatePoint');

module.exports = points => {
  if (points.map(el => validatePoint(el)).includes(false)) {
    return false;
  }
  return true;
};
