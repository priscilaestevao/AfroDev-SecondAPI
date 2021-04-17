const UserSerializer = require("../../shared/Serialize").SerializeUser;
const User = require("../../services/users/User");
const UserTable = require("../../models/users/UserTable");

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const reqUser = req.body;
      const user = new User(reqUser);
      await user.create();
      const serializer = new UserSerializer(
        res.getHeader("Content-Type")
      );
      res.status(201).send(serializer.transform(user));
    } catch (error) {
      next(error);
    }
  },

  loadUser: async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = new User({ id: id });
      await user.searchById();
      const serializer = new UserSerializer(
        res.getHeader("Content-Type")
      );
      res.status(200).send(serializer.transform(user));
    } catch (error) {
      next(error);
    }
  },

  loadAllUser: async (req, res, next) => {
    try {
      const results = await UserTable.list();
      const serializer = new UserSerializer(
        res.getHeader("Content-Type")
      );
      res.status(200).send(serializer.transform(results));
    } catch (error) {
      next(error);
    }
  },

  alterUser: async (req, res, next) => {
    try {
      const id = req.params.id;
      const dataBody = req.body;
      const data = Object.assign({}, dataBody, { id: id });
      const user = new User(data);
      await user.update();
      const serializer = new UserSerializer(
        res.getHeader("Content-Type")
      );
      res.status(204).send(serializer);
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = new User({ id: id });
      await user.remove();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};
