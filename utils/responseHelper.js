const successResponse = (message, data = null) => {
  return {
    status: 'success',
    message,
    data,
  };
};

const errorResponse = (message) => {
  return {
    status: 'fail',
    message,
  };
};

module.exports = { successResponse, errorResponse };
