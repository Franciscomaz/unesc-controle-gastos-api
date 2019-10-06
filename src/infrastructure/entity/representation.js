class Representation {
  constructor(entity, representation) {
    this.entity = entity;
    this.representation = representation;
  }

  static fromEntity(entity) {
    return new Representation(entity, {});
  }

  withField(name, alias) {
    this.representation[alias || name] = this.entity[name];
    return this;
  }

  build() {
    return this.representation;
  }
}

module.exports = Representation;
