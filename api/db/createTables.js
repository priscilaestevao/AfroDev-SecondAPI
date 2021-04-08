const ModelTableScheduling = require("../schedulingsModel/modelSchedulingTable");

ModelTableScheduling.sync()
  .then(() => {
    console.log("Table created successfully!");
  })
  .catch(
    console.log("Error! Table not created.")
  );
