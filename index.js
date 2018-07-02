
module.exports = function safely(value, option = {}) {
  const { checkString, returnError, nullOnError } = Object.assign({
    checkString: true,
    returnError: false,
    nullifyOnError: false,
  }, option);
  try {
    if (checkString === true && typeof value !== 'string') {
      throw new TypeError('Value given is not string');
    }

    return JSON.parse(value);
  } catch (ex) {
    if (nullOnError === true) {
      if (returnError === true) {
        return {
          error: ex,
          value: null,
        };
      }

      return null;
    }

    if (returnError === true) {
      return {
        error: ex,
        value,
      };
    }

    return value;
  };
};
