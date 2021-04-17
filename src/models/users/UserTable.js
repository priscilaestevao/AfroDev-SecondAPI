const modelUser = require("./modelUserTable");

module.exports = {
  async list() {
    try {
      return await modelUser.findAll({
        raw: true,
      });
    } catch (error) {
      throw error;
    }
  },

  async add(user) {
    try {
      return await modelUser.create(user);
    } catch (error) {
      throw error;
    }
  },

  async searchByPk(id) {
    try {
      return await await modelUser.findByPk(id);
    } catch (error) {
      throw error;
    }
  },

  async searchByEmail(email) {
    try {
      return await modelUser.findOne({
        where: {
          email: email,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  async update(id, data) {
    try {
      return await modelUser.update(data, {
        where: { id: id },
      });
    } catch (error) {
      throw error;
    }
  },

  async remove(id) {
    try {
      return await modelUser.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
};
