const mongoose = require("mongoose");

const url = "mongodb+srv://userDb:1728@cluster0.izsu8.mongodb.net/modamarie?retryWrites=true&w=majority";

const connection = mongoose
  .connect(url, {
    useNewUrlParser: true,
  })
  .then((resp) => {
    if (resp) console.log("Conectado ao MongoDB: ", url);
  })
  .catch((err) => {
    if (err) throw err;
  });

module.exports = connection;
