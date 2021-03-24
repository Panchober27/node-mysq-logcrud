const express = require('express');
const router = express.Router();

// pool es la conexion a la bd
const pool = require('../database');



router.get('/add', (req,res) => {
    res.render('links/add');
})

module.exports = router;