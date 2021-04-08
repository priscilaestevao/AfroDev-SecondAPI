const router = require("express").Router();

router.get("/schedulings", (req, res) => {
  res.send("OK");
});

module.exports = router;
