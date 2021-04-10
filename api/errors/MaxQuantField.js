class MaxQuantField extends Error {
  constructor(field) {
    const message = `The field ${field} has exceeded the maximum length of 64 characters.`;
    super(message);
    this.name = "MaxQuantField";
    this.idError = 5;
  };
};

module.exports = MaxQuantField;
