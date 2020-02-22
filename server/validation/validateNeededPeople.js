module.exports = neededPeople => {
  if (neededPeople > 0 && neededPeople <= 100) return true;
  return false;
};
