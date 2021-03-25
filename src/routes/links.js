const express = require("express");
const router = express.Router();

// pool es la conexion a la bd
const pool = require("../database");

router.get("/add", (req, res) => {
  res.render("links/add");
});

// Ruta para el envio de datos del formulario.
router.post("/add", (req, res) => {
  res.send("Recived");
});

module.exports = router;
