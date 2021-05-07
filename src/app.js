const { resolve } = require('path')
const express = require('express');

const app = express();

const routes = require('./routes');


app.set('views', resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolve(__dirname, '..', 'public')));

app.use(routes);

module.exports = app;