const router = require("express").Router();
const UserSerializer = require("../../Serialize").SerializeUser;
const UserTable = require("../../users/UserTable");
const User = require("../../users/User");

router.get("/users", async (req, res, next) => {
  try {
    const results = await UserTable.list();
    const serializer = new UserSerializer(res.getHeader("Content-Type"));
    res.status(200).send(serializer.transform(results));
  } catch (error) {
    next(error);
  }
});

router.get("/users/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = new User({ id: id });
    await user.searchById();
    const serializer = new UserSerializer(res.getHeader("Content-Type"));
    res.status(200).send(serializer.transform(user));
  } catch (error) {
    next(error);
  }
});

router.post("/users", async (req, res, next) => {
  try {
    const reqUser = req.body;
    const user = new User(reqUser);
    await user.create();
    const serializer = new UserSerializer(res.getHeader("Content-Type"));
    res.status(201).send(serializer.transform(user));
  } catch (error) {
    next(error);
  }
});

router.put("/users/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const dataBody = req.body;
    const data = Object.assign({}, dataBody, { id: id });
    const user = new User(data);
    await user.update();
    const serializer = new UserSerializer(res.getHeader("Content-Type"));
    res.status(204).send(serializer);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
