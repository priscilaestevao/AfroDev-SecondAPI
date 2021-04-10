class InvalidField extends Error {
  constructor(field) {
    const message = `The ${field} field is invalid!`;
    super(message);
    this.name = "InvalidField";
    this.idError = 1;
  };
};

module.exports = InvalidField;
