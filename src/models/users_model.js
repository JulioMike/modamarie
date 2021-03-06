const mongoose = require("mongoose");

const validarEmail = (email) => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validarCPF = (cpf) => {
  let re = /^((\d{3}).(\d{3}).(\d{3})-(\d{2}))*$/;
  return re.test(cpf);
};

const usersSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validarEmail],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  senha: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
    validate: [validarCPF],
  },
  celular: { type: Number, required: true },
  endereco: {type: String, required: true},
  isAdmin: {type:Boolean, default:false}
});

const users_model = mongoose.model("users", usersSchema);

module.exports = users_model;
