const ModelSchedulingTable = require("../schedulings/modelSchedulingTable");
const ModelUserTable = require("../users/modelUserTable");

ModelSchedulingTable.sync()
  .then(() => {
    console.log("Table created successfully!");
  })
  .catch((error) => {
    console.log("Error! Table not created.", error)
  })

  ModelUserTable.sync()
  .then(() => {
    console.log("Table created successfully!");
  })
  .catch((error) => {
    console.log("Error! Table not created.", error)
  });