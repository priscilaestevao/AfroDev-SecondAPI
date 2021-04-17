class InvalidFormat extends Error {
  constructor(contentType) {
    const message = `The type ${contentType} is invalid! The API accepts only JSON.`;
    super(message);
    this.name = "InvalidFormat";
    this.idError = 6;
  };
};

module.exports = InvalidFormat;
