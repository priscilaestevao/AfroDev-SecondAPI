const router = require("express").Router();
const passport = require("passport");
const userService = require("../../services/users");

router.get(
  "/users",
  passport.authenticate("bearer", { session: false }),
  userService.loadAllUser
);

router.get(
  "/users/:id",
  passport.authenticate("bearer", { session: false }),
  userService.loadUser
);

router.post(
  "/users",
  passport.authenticate("bearer", { session: false }),
  userService.createUser
);

router.put(
  "/users/:id",
  passport.authenticate("bearer", { session: false }),
  userService.alterUser
);

router.delete(
  "/users/:id",
  passport.authenticate("bearer", { session: false }),
  userService.deleteUser
);

module.exports = router;
