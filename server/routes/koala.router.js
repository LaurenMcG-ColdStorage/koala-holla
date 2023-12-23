const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const koalas = require('../data/koala-data');

// GET
koalaRouter.get('/',(req, res) => {

});

// POST
koalaRouter.post('/', (req, res => {

}));

// PUT


// DELETE

module.exports = koalaRouter;