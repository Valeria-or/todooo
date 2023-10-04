require('@babel/register');
const express = require('express');
const route = express.Router();

const render = require('../lib/render');
const Home = require('../../views/Home');

route.get('/', (req, res) => {
  render(Home, {}, res)
  })

module.exports = route;
