const { isEmpty, isLength } = require('./validator');
const FIELD_REQUIRED = 'Это поле обязательно';
const PASSWORD_LENGTH = 'Количество символов должно быть между 10 и 40';

const validateLocation = ({ title, point, description }) => {
  const errors = {};
  if (isEmpty(title)) errors.title = FIELD_REQUIRED;
  if (isEmpty(description)) errors.description = FIELD_REQUIRED;
  if (point.split(';').length !== 2)
    errors.description = 'Попробуйте указать локацию еще раз';

  if (!isLength(description, { min: 10, max: 40 }))
    errors.password = PASSWORD_LENGTH;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateLocation;
