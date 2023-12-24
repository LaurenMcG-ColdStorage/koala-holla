const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const koalas = require('../data/koala-data');

// GET
koalaRouter.get('/',(req, res) => {
    res.send(koalas);
});

// POST
koalaRouter.post('/', (req, res) => {
    const newKoala = req.body;  //Stores our new koala
    //let lastID = koalas.length; //Finds current max ID
    //newKoala.id = lastID +1;    //Assigns new koala an ID
    koalas.push(newKoala);      //Updates koala array
    res.sendStatus(201);
});

// PUT


// DELETE

module.exports = koalaRouter;