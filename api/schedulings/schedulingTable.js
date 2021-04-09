const { removeAllListeners } = require("nodemon");
const modelScheduling = require("./modelSchedulingTable");

module.exports = {
  async list() {
    return await modelScheduling.findAll({
      raw: true,
    });
  },

  async add(scheduling) {
    return await modelScheduling.create(scheduling);
  },

  async searchByPK(id) {
    return await modelScheduling.findByPk(id);
  },

  async remove(id) {
    return await modelScheduling.destroy({
      where: { id: id },
    });
  },

  async edit(id, data) {
    return await modelScheduling.update(data, {
      where: { id: id },
    });
  }
};
