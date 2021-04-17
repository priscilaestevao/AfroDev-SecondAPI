const router = require("express").Router();
const passport = require("passport");
const schedulingService = require("../../services/schedulings");

router.get(
  "/schedulings",
  passport.authenticate("bearer", { session: false }),
  schedulingService.loadAllScheduling
);

router.get(
  "/schedulings/:id",
  passport.authenticate("bearer", { session: false }),
  schedulingService.loadScheduling
);

router.post(
  "/schedulings",
  passport.authenticate("bearer", { session: false }),
  schedulingService.createScheduling
);

router.put(
  "/schedulings/:id",
  passport.authenticate("bearer", { session: false }),
  schedulingService.alterScheduling
);

router.delete(
  "/schedulings/:id",
  passport.authenticate("bearer", { session: false }),
  schedulingService.deleteScheduling
);

module.exports = router;
