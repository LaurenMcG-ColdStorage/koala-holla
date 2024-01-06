const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
//let koalas = require('../data/koala-data');
let pool = require('../database/pool')

// GET
koalaRouter.get('/',(req, res) => {
    const dbQuery =  `SELECT * FROM "koalas" ORDER BY "id";`;
    pool
    .query(dbQuery)
    .then((result) => {
        //console.log('Current Table: ', result);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('Error: ', error);
        res.sendStatus(500);
    });
    //res.send(koalas);     Deprecated, uses array storage instead of DB
});

// POST
koalaRouter.post('/', (req, res) => {
    let newKoala = req.body;  //Stores our new koala
    console.log('New Koala: ', newKoala);
    //let lastID = koalas.length; //Finds current max ID
    //newKoala.id = lastID +1;    //Assigns new koala an ID
    //koalas.push(newKoala);      //Updates koala array            Deprecated, uses array storage instead of DB
    //console.log(koalas);                                         Deprecated, uses array storage instead of DB
    const queryText = `INSERT INTO "koalas" ("name", "age", "gender", "readyToTransfer", "notes") VALUES ($1, $2, $3, $4, $5);`;
    const queryArgs = [newKoala.name, newKoala.age, newKoala.gender, newKoala.readyToTransfer, newKoala.notes];

    pool
    .query(queryText, queryArgs)
    .then((result) => {
        console.log('Koala Added to Database');
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('Update failed', error);
        res.sendStatus(500);
    });
    //res.sendStatus(201);
});

// PUT
koalaRouter.put(`/:id`, (req,res) => {
    const modifiedKoala = parseInt(req.params.id);
    console.log(modifiedKoala);
    const isReady = req.body.transfer;
    console.log(isReady);
    let queryText = ``;

    if (isReady === 'Y'){
        queryText = `UPDATE "koalas" SET "readyToTransfer" = 'N' WHERE "id" = $1;`;
    } else if (isReady === 'N') {
        queryText = `UPDATE "koalas" SET "readyToTransfer" = 'Y' WHERE "id" = $1;`;
    };
    //console.log(queryText);

    pool
    .query(queryText, [modifiedKoala])
    .then((result) => {
        //console.log(result);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })
    // let koalaFound = false;
    // koalas = koalas.map(koala => {
    //     if (koala.id === modifiedKoala){
    //         koalaFound = true;
    //         return { ...koala, readyToTransfer: 'Y'};
    //     }
    //     return koala;
    // });

    // if (koalaFound){
    //     res.status(200).send('Koala readiness updated')
    // } else {
    //     res.status(400).send('Koala readiness update failed')
    // };
});
// DELETE

koalaRouter.delete('/:id', (req, res) =>{
    const deleteKoala = parseInt(req.params.id);
    console.log(deleteKoala);
    const queryText = `DELETE FROM "koalas" WHERE "id" = $1;`;

    pool
    .query(queryText, [deleteKoala])
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('Failed to delete ', error)
        res.sendStatus(500);
    });
    // koalas = koalas.filter(koala => { 
    //     return koala.id !== deleteKoala;
    // })
    // console.log(koalas);
    // res.sendStatus(201);
})
module.exports = koalaRouter;
