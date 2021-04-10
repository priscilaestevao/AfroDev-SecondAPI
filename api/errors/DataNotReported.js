class DataNotReported extends Error {
  constructor() {
    const message = "Data not reported!";
    super(message);
    this.name = "DataNotReported";
    this.idError = 3;
  };
};

module.exports = DataNotReported;
