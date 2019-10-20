const EXCEPTION_TYPES = require('../exception/types');

const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class ObjectIdWrapper {
  constructor(value) {
    if (!ObjectId.isValid(value)) {
      throw {
        message: `Formato do id inválido: ${value}`,
        type: EXCEPTION_TYPES.BAD_REQUEST
      };
    }

    this.value = value;
  }

  get() {
    return this.value;
  }
};
