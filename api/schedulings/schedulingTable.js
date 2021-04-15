const modelScheduling = require("./modelSchedulingTable");

module.exports = {
  async list() {
    try {
      return await modelScheduling.findAll({
        raw: true,
      });
    } catch (error) {
      throw error;
    }
  },

  async add(scheduling) {
    try {
      return await modelScheduling.create(scheduling);
    } catch (error) {
      throw error;
    }
  },

  async searchByPk(id) {
    try {
      return await modelScheduling.findByPk(id);
    } catch (error) {
      throw error;
    }
  },

  async update(id, data) {
    try {
      return await modelScheduling.update(data, {
        where: { id: id },
      });
    } catch (error) {
      throw error;
    }
  },

  async remove(id) {
    try {
      return await modelScheduling.destroy({
        where: { id: id },
      });
    } catch (error) {
      throw error;
    }
  }
};
