const InvalidFormat = require("./errors/InvalidFormat");
const jsontoxml = require("jsontoxml");

class Serialize {
  json(data) {
    return JSON.stringify(data);
  }

  xml(data) {
    if (Array.isArray(data)) {
      data = data.map((item) => {
        return {
          [this.tag]: item
        };
      });
      this.tag = this.tagList;
    }
    return jsontoxml({
      [this.tag]: data
    });
  }

  transform(data) {
    data = this.filter(data)
    if (this.contentType === "application/json") {
      return this.json(data);
    }
    if (this.contentType === "application/xml") {
      return this.xml(data)
    }

    throw new InvalidFormat(this.contentType);
  }

  filterFields(data) {
    const filteredFields = {};
    this.allowedFields.forEach((field) => {
      if (data.hasOwnProperty(field)) {
        filteredFields[field] = data[field];
      }
    });

    return filteredFields;
  }

  filter(data) {
    let filteredData = this.filterFields(data);

    if (Array.isArray(data)) {
      filteredData = data.map((information) => {
        return this.filterFields(information);
      });
    }

    return filteredData;
  }
}

class SerializeScheduling extends Serialize {
  constructor(contentType, customizableFields) {
    super();
    this.contentType = contentType;
    this.allowedFields = ["id", "client_name", "scheduling_date"].concat(
      customizableFields || []
    );
    this.tag = "Scheduling";
    this.tagList = "Schedulings";
  }
}

class SerializeError extends Serialize {
  constructor(contentType, customizableFields) {
    super();
    this.contentType = contentType;
    this.allowedFields = ["id", "message"].concat(
      customizableFields || []
    );
    this.tag = "Error";
    this.tagList = "Errors";
  }
}

class SerializeUser extends Serialize {
  constructor(contentType, customizableFields) {
    super();
    this.contentType = contentType;
    this.allowedFields = ["id", "name", "email", "password"].concat(
      customizableFields || []
    );
    this.tag = "User";
    this.tagList = "Users";
  }
}


module.exports = {
  Serialize: Serialize,
  SerializeScheduling: SerializeScheduling,
  SerializeError: SerializeError,
  SerializeUser: SerializeUser,
  ValidsFormats: ["application/json", "application/xml"],
};
