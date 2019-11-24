module.exports = class Page {
  constructor(content, pagination, total) {
    this.content = content;
    this.pagination = pagination;
    this.total = total;
  }

  current() {
    return Math.ceil((this.pagination.offset + 1) / this.pagination.limit);
  }

  totalOfPages() {
    return Math.ceil(this.total / this.pagination.limit);
  }

  hasNext() {
    return this.pagination.offset + this.content.length < this.total;
  }
};
