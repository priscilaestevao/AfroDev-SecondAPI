const SchedulingSerializer = require("../../shared/Serialize").SerializeScheduling;
const Scheduling = require("../../services/schedulings/Scheduling");
const schedulingTable = require("../../models/schedulings/SchedulingTable");

module.exports = {
  createScheduling: async (req, res, next) => {
    try {
      const reqSchedule = req.body;
      const scheduling = new Scheduling(reqSchedule);
      await scheduling.create();
      const serializer = new SchedulingSerializer(
        res.getHeader("Content-Type"),
        ["status"]
      );
      res.status(201).send(serializer.transform(scheduling));
    } catch (error) {
      next(error);
    }
  },

  loadScheduling: async (req, res, next) => {
    try {
      const id = req.params.id;
      const scheduling = new Scheduling({ id: id });
      await scheduling.searchById();
      const serializer = new SchedulingSerializer(
        res.getHeader("Content-Type"),
        ["service_name", "status"]
      );
      res.status(200).send(serializer.transform(scheduling));
    } catch (error) {
      next(error);
    }
  },

  loadAllScheduling: async (req, res, next) => {
    try {
      const results = await schedulingTable.list();
      const serializer = new SchedulingSerializer(
        res.getHeader("Content-Type"), ["service_name"]);
      schedulings = serializer.transform(results);
      res.status(200).send(schedulings);
    } catch (error) {
      next(error);
    }
  },

  alterScheduling: async (req, res, next) => {
    try {
      const id = req.params.id;
      const dataBody = req.body;
      const data = Object.assign({}, dataBody, { id: id });
      const scheduling = new Scheduling(data);
      await scheduling.update();
      const serializer = new SchedulingSerializer(
        res.getHeader("Content-Type")
      );
      res.status(204).send(serializer.transform(scheduling));
    } catch (error) {
      next(error);
    }
  },

  deleteScheduling: async (req, res, next) => {
    try {
      const id = req.params.id;
      const scheduling = new Scheduling({ id: id });
      await scheduling.remove();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};
