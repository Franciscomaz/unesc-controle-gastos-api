const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 20;

module.exports = class Pagination {
  constructor(query, limit, offset) {
    this.query = query;
    this.limit = limit ? Number(limit) : DEFAULT_LIMIT;
    this.offset = offset ? Number(offset) : DEFAULT_OFFSET;
  }
};
