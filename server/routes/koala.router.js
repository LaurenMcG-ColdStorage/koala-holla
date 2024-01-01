const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
let koalas = require('../data/koala-data');

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
    console.log(koalas);
    res.sendStatus(201);
});

// PUT
koalaRouter.put(`/:id`, (req,res) => {
    const modifiedKoala = parseInt(req.params.id);
    console.log(modifiedKoala);
    const isReady = req.body.readyToTransfer;
    console.log(isReady)

    let koalaFound = false;
    koalas = koalas.map(koala => {
        if (koala.id === modifiedKoala){
            koalaFound = true;
            return { ...koala, readyToTransfer: 'Y'};
        }
        return koala;
    });

    if (koalaFound){
        res.status(200).send('Koala readiness updated')
    } else {
        res.status(400).send('Koala readiness update failed')
    };
});

// DELETE

koalaRouter.delete('/:id', (req, res) =>{
    const deleteKoala = parseInt(req.params.id);
    console.log(deleteKoala);
    koalas = koalas.filter(koala => { 
        return koala.id !== deleteKoala;
    })
    console.log(koalas);
    res.sendStatus(201);
})
module.exports = koalaRouter;
