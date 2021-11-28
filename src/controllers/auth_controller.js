const mongoose = require('mongoose');

const Users = require("../models/users_model");

const Auth = require("../config/auth");

module.exports = {
  Login: async (req, res, next) => {
    const [, hash] = req.headers.authorization.split(" ");
    const [email, senha] = Buffer.from(hash, "base64").toString().split(":");

    try {
      const user = await Users.findOne({ email, senha });

      if (!user) {
        res.status(401).json({ msg: "Usuario não existe..." });
      }

      const token = Auth.Sign({ user: user.id });

      res.send({ user, token });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(res.status(400).json({ mensagem: "Usuario não existe.." }));
        return;
      }
      next(error);
    }
  },
  Register: async (req, res, next) => {
    try {
      const users = new Users(req.body);
      const result = await users.save();
      const { senha, ...user } = result.toObject();

      res.send(user);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        res.status(422).json({ erro: error.message });
        return;
      }
      next(error);
    }
  },
  userOn: async (req, res) =>{
    res.send(req.auth);
  }
};
