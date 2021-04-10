const InvalidFormat = require("./errors/InvalidFormat");

class Serialize {
  json(data) {
    return JSON.stringify(data);
  };

  transform(data) {
    if (this.contentType !== "application/json") {
      throw new InvalidFormat(this.contentType);
    }
    return this.json(this.filter(data));
  };

  filterFields(data) {
    const filteredFields = {};
    this.allowedFields.forEach((field) => {
      if (data.hasOwnProperty(field)) {
        filteredFields[field] = data[field];
      }
    });

    return filteredFields;
  };

  filter(data) {
    let filteredData = this.filterFields(data);

    if (Array.isArray(data)) {
      filteredData = data.map((information) => {
        return this.filteredFields(information);
      });
    }

    return filteredData;
  };
};

class SerializeScheduling extends Serialize {
  constructor(contentType, customizableFields) {
    super();
    this.contentType = contentType;
    this.allowedFields = ["id", "client_name", "scheduling_date"].concat(
      customizableFields || []
    );
  };
};

module.exports = {
  Serialize: Serialize,
  SerializeScheduling: SerializeScheduling,
  ValidsFormats: ["aplication/json"],
};