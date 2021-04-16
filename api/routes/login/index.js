const router = require("express").Router();
const passport = require("passport");
const userController = require("../../users/userController");

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  userController.login
);

module.exports = router;
