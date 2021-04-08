const Sequelize = require("sequelize");
const instancedb = require("../db/instancedb");

const columns = {
  client_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  service_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("scheduled", "cancelled"),
    allowNull: false,
  },
  scheduling_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
};

const sequelizeOptions = {
  freezeTableName: true,
  tableName: "scheduling",
  timestamps: true,
  createdAt: "creation_date",
  updatedAt: "update_date",
};

module.exports = instancedb.define("scheduling", columns, sequelizeOptions);
