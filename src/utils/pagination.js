const DEFAULT_LIMIT = 20;

module.exports = class Pagination {
  constructor(query, limit) {
    this.query = query;
    this.limit = limit ? Number(limit) : DEFAULT_LIMIT;
  }
};
