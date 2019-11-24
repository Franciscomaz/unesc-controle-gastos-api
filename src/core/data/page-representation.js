module.exports = class PageRepresentation {
  constructor(content, total, current, perPage, totalOfPages, hasNext) {
    this.content = content;
    this.total = total;
    this.current = current;
    this.perPage = perPage;
    this.totalOfPages = totalOfPages;
    this.hasNext = hasNext;
  }

  static fromPage(page, entityFormatter) {
    const formattedContent = page.content.map(entity =>
      entityFormatter(entity)
    );

    return new PageRepresentation(
      formattedContent,
      page.total,
      page.current(),
      page.pagination.limit,
      page.totalOfPages(),
      page.hasNext()
    );
  }
};
