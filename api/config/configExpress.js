const express = require("express");
const router = require("../routes/schedulingsRoute");

module.exports = () => {
  const app = express();

  app.use(express.json());
  app.use("/salon", router);

  return app;
};
