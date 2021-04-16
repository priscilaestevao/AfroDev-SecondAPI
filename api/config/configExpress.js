const express = require("express");
const routesScheduling = require("../routes/schedulingsRoute");
const routesUser = require("../routes/usersRoute");
const routesLogin = require("../routes/login");
const ValidsFormats = require("../Serialize").ValidsFormats;
const InvalidField = require("../errors/InvalidField");
const DataNotReported = require("../errors/DataNotReported");
const NotFound = require("../errors/NotFound");
const InvalidFormat = require("../errors/InvalidFormat");
const SerializeError = require("../Serialize").SerializeError;
const passport = require("../users/authentication");

module.exports = () => {
  const app = express();

  app.use((req, res, next) => {
    let requestedFormat = req.header("Accept");
    if (requestedFormat === "*/*") {
      requestedFormat = "application/json";
    }
    if (ValidsFormats.indexOf(requestedFormat) === -1) {
      res.status(406);
      return res.send();
    }

    res.setHeader("Content-Type", requestedFormat);
    next();
  });
  app.use(express.json());
  app.use("/salon", routesScheduling);
  app.use("/salon", routesUser);
  app.use("/salon", routesLogin);
  app.use((error, req, res, next) => {
    let status = 500;
    if (error instanceof InvalidField || error instanceof DataNotReported) {
      status = 400;
    }
    if (error instanceof NotFound) {
      status = 404;
    }
    if (error instanceof InvalidFormat) {
      status = 406;
    }
    serializeError = new SerializeError(
      res.getHeader("Content-Type")
    );

    res.status(status).send(
      serializeError.transform({
        id: error.idError,
        message: error.message
      })
    );
  });

  return app;
};
