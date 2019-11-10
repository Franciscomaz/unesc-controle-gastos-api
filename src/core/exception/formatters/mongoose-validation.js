const { createValidationErrorMessage } = require('../message/factory');

module.exports = {
  format: error => {
    const details = [];

    for (const detail in error.errors) {
      details.push(error.errors[detail].message);
    }

    return details.map(detail => createValidationErrorMessage(detail));
  }
};
