const modelScheduling = require("./modelSchedulingTable");

module.exports = {
  async list() {
    return await modelScheduling.findAll({
      raw: true,
    });
  },
};
