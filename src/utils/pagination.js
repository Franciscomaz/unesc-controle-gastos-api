module.exports = class Pagination {
  constructor(query, limit) {
    this.query = query;
    this.limit = Number(limit);
  }
};
