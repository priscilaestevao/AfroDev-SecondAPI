const InvalidField = require("../errors/InvalidField");
const UserTable = require("./UserTable");
const MinQuantField = require("../errors/MinQuantField");
const MaxQuantField = require("../errors/MaxQuantField");
const NotFound = require("../errors/NotFound");
const DataNotReported = require("../errors/DataNotReported");

class User {
  constructor({ id, name, email, password, creation_date, update_date }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.creation_date = creation_date;
    this.update_date = update_date;
    this.passwordHash = "";
  };

  async create() {
    this.validate();
    const result = await UserTable.add({
      name: this.name,
      email: this.email,
      password: this.password,
    });
    this.id = result.id;
    this.creation_date = result.creation_date;
    this.update_date = result.update_date;
  };

  async searchById() {
    const result = await UserTable.searchByPK(this.id);
    if (!result) {
      throw new NotFound("User");
    }
    this.name = result.name;
    this.email = result.email;
    this.password = result.password;
    this.creation_date = result.creation_date;
    this.update_date = result.update_date;
  };

  async searchByEmail() {
    const result = await UserTable.searchByEmail(this.email);
    if (!result) {
      throw new NotFound("User");
    }
    this.id = result.id;
    this.name = result.name;
    this.password = result.password;
    this.creation_date = result.creation_date;
    this.update_date = result.update_date;
  };

  async update() {
    const result = await UserTable.searchByPk(this.id);
    if (!result) {
      throw new NotFound("User");
    };
    const updatableFields = ["name", "email", "password"];
    const dataToUpdate = {};

    updatableFields.forEach((field) => {
      const value = this[field];
      if (typeof value === "string" && value.length > 0) {
        dataToUpdate[field] = value;
      }
    });

    if (Object.keys(dataToUpdate).length === 0) {
      throw new DataNotReported()
    }
    this.validate();

    await UserTable.update(this.id, dataToUpdate);
  };

  async remove() {
    await UserTable.remove(this.id);
  };

  validate() {
    const requiredFields = ["name", "email", "password"];
    
    requiredFields.forEach((field) => {
      const value = this[field];
      if (typeof value !== "string" || value.length === 0) {
        throw new InvalidField(field);
      };

      if (value.length < 8 && field === "password") {
        throw new MinQuantField(field);
      };

      if (value.length > 64 && field === "password") {
        throw new MaxQuantField(field);
      };
    });
  };
};

module.exports = User;
