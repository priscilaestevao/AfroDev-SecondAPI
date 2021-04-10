class MinQuantField extends Error {
  constructor(field) {
    const message = `The ${field} field must be at least 8 characters long.`;
    super(message);
    this.name = "MinQuantField";
    this.idError = 2;
  };
};

module.exports = MinQuantField;
