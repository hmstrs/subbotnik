module.exports = point => {
  if (!point.includes(';') || point.length < 3) return false;
  const [x, y] = point.split(';').map(el => Number(el));
  if (isNaN(x) || isNaN(y)) return false;
  return true;
};
