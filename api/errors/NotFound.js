class NotFound extends Error {
  constructor() {
    const message = "Schedule not found!";
    super(message);
    super(field);
    this.name = "NotFound";
    this.idError = 4;
  };
};

module.exports = NotFound;
