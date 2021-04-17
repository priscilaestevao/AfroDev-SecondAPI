const SchedulingTable = require("../../models/schedulings/SchedulingTable");
const InvalidField = require("../../errors/InvalidField");
const DataNotReported = require("../../errors/DataNotReported");
const NotFound = require("../../errors/NotFound");

class Scheduling {
  constructor({ id, client_name, service_name, status, scheduling_date, creation_date, update_date }) {
    this.id = id;
    this.client_name = client_name;
    this.service_name = service_name;
    this.status = status;
    this.scheduling_date = scheduling_date;
    this.creation_date = creation_date;
    this.update_date = update_date;
  }

  async create() {
    this.validate();
    const result = await SchedulingTable.add({
      client_name: this.client_name,
      service_name: this.service_name,
      status: this.status,
      scheduling_date: this.scheduling_date,
    });
    this.id = result.id;
    this.creation_date = result.creation_date;
    this.update_date = result.update_date;
  }

  async searchById() {
    const result = await SchedulingTable.searchByPk(this.id);
    if (!result) {
      throw new NotFound("Scheduling");
    }
    this.client_name = result.client_name;
    this.service_name = result.service_name;
    this.status = result.status;
    this.scheduling_date = result.scheduling_date;
    this.creation_date = result.creation_date;
    this.update_date = result.update_date;
  }

  async update() {
    const result = await SchedulingTable.searchByPk(this.id);
    if (!result) {
      throw new NotFound("Scheduling");
    }
    const updatableFields = ["client_name", "service_name", "status", "scheduling_date"];
    const dataToUpdate = {};

    updatableFields.forEach((field) => {
      const value = this[field];
      if (typeof value === "string" && value.length > 0) {
        dataToUpdate[field] = value;
      }
    });

    if (Object.keys(dataToUpdate).length === 0) {
      throw new DataNotReported();
    }
    this.validate();

    await SchedulingTable.update(this.id, dataToUpdate);
  };

  async remove() {
    const result = await SchedulingTable.searchByPk(this.id);
    if (!result) {
      throw new NotFound("Scheduling");
    }
    await SchedulingTable.remove(this.id);
  };

  validate() {
    const requiredFields = ["client_name", "service_name", "status", "scheduling_date"];
    
    requiredFields.forEach((field) => {
      const value = this[field];
      if (typeof value !== "string" || value.length === 0) {
        throw new InvalidField(field);
      }
    });
  };
};

module.exports = Scheduling;
