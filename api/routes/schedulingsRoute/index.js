const router = require("express").Router();
const schedulingTable = require("../../schedulings/schedulingTable");
const Scheduling = require("../../schedulings/Scheduling");
const SchedulingSerializer = require("../../Serialize").SerializeScheduling;

router.get("/schedulings", async (req, res, next) => {
  try {
    const results = await schedulingTable.list();
    const serializer = new SchedulingSerializer(
      res.getHeader("Content-Type"),
      ["service_name"]
    );
    schedulings = serializer.transform(results);
    res.status(200).send(schedulings);
  } catch (error) {
    next(error);
  }
});

router.get("/schedulings/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const scheduling = new Scheduling({ id: id });
    await scheduling.search();
    const serializer = new SchedulingSerializer(
      res.getHeader("Content-Type"),
      ["service_name", "status"]
    )
    res.status(200).send(serializer.transform(scheduling));
  } catch (error) {
    next(error);
  }
});

router.post("/schedulings", async (req, res, next) => {
  try {
    const reqSchedule = req.body;
    const scheduling = new Scheduling(reqSchedule);
    await scheduling.create();
    const serializer = new SchedulingSerializer(
      res.getHeader("Content-Type"),
      ["status"]
    )
    res.status(201).send(serializer.transform(scheduling));
  } catch (error) {
    next(error);
  }
});

router.put("/schedulings/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const dataBody = req.body;
    const data = Object.assign({}, dataBody, { id: id });
    const scheduling = new Scheduling(data);
    await scheduling.update();
    res.status(204).send();
  } catch (error) {
   next(error);
  }
});

router.delete("/schedulings/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const scheduling = new Scheduling({ id: id });
    await scheduling.remove();
    res.status(204).send()
  } catch (error) {
    next(error);
  }
});

module.exports = router;
