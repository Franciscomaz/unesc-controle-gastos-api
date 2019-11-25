const ORDER = {
  ascend: 'ascend',
  descend: 'descend'
};

module.exports = class Sort {
  constructor(field, order) {
    this.field = field;
    this.order = order;
  }

  direction() {
    if (this.order === ORDER.descend) {
      return -1;
    }

    if (this.order === ORDER.ascend) {
      return 1;
    }

    return 0;
  }
};
