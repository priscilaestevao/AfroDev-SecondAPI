const router = require("express").Router();
const passport = require("passport");
const loginService = require("../../services/login/index");

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginService.login
);

module.exports = router;
