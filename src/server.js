const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { connection } = require("./config/connect");
const app = express();

const users_routes = require('./routes/auth_routes');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(users_routes);

app.listen('5000', ()=>{
    console.log('Servidor rodando na porta 5000.');
})

