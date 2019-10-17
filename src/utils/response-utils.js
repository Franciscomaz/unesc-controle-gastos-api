module.exports = {
  successResponse: data => {
    return {
      data: data
    };
  },
  createdResponse: (data, resourcePath) => {
    return {
      data: data,
      links: {
        self: resourcePath
      }
    };
  }
};
