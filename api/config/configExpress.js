const express = require("express");
const router = require("../routes/schedulingsRoute");
const InvalidFormat = require("../errors/InvalidFormat");
const ValidsFormats = require("../Serialize").ValidsFormats;

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
  app.use("/salon", router);

  return app;
};
