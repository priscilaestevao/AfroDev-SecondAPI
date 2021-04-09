const router = require("express").Router();
const schedulingTable = require("../../schedulings/schedulingTable");
const Scheduling = require("../../schedulings/schedulingClass");

router.get("/schedulings", async (req, res) => {
  const results = await schedulingTable.list();
  res.send(JSON.stringify(results));
});

router.post("/schedulings", async (req, res) => {
  const reqSchedule = req.body;
  const scheduling = new Scheduling(reqSchedule);
  await scheduling.create();
  res.send(JSON.stringify(scheduling));
});

router.get("/schedulings/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const scheduling = new Scheduling({ id: id });
    await scheduling.search();
    res.send(JSON.stringify(scheduling));
  } catch (error) {
    res.send(
      JSON.stringify({
        message: error.message
      })
    );
  }
});

router.put("/schedulings/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const dataBody = req.body;
    const data = Object.assign({}, dataBody, { id: id });
    const scheduling = new Scheduling(data);
    await scheduling.edit();
    await scheduling.search();
    res.send(JSON.stringify(scheduling));
  } catch {
    res.send(
      JSON.stringify({
        message: error.message
      })
    );
  }
});

router.delete("/schedulings/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const scheduling = new Scheduling({ id: id });
    await scheduling.remove();
    res.send(
      JSON.stringify({
        message: "Registry removed!",
      })
    );
  } catch (error) {
    res.send(
      JSON.stringify({
        message: error.message
      })
    );
  }
});

module.exports = router;
