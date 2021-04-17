const Sequelize = require("sequelize");
const instancedb = require("../../db/instancedb");

const columns = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
};

const sequelizeOptions = {
    freezeTableName: true,
    tableName: "user",
    timestamps: true,
    createdAt: "creation_date",
    updatedAt: "update_date"
};

module.exports = instancedb.define("user", columns, sequelizeOptions);