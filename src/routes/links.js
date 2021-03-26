const express = require("express");
const router = express.Router();

// pool es la conexion a la bd
const pool = require("../database");

router.get("/add", (req, res) => {
  res.render("links/add");
});

// Ruta para recibir de datos del formulario.
router.post("/add", async (req, res) => {
  // console.log(req.body);
  const { title, url, description } = req.body;
  const newLink = {
    title,
    url,
    description,
  };
  await pool.query("INSERT INTO links set ?", [newLink]);
  req.flash("success", "Link Guardado Correctamente"); // flash toma 2 params
  res.redirect("/links");
});

// Esta ruta le precede el prefijo links.
router.get("/", async (req, res) => {
  const links = await pool.query("SELECT * FROM links");
  console.log(links);
  res.render("links/list", { links });
});

// Ruta para eliminar un link.
router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM links WHERE id = ?", [id]);
  req.flash("success", "link Borrado Correctamente");
  res.redirect("/links");
});

// Ruta para modificar un enlace
router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const links = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
  res.render("links/edit", { link: links[0] });
});

// Ruta para la vista de modificar los enlaces.
router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, url } = req.body;
  const newLink = {
    title,
    description,
    url,
  };
  await pool.query("UPDATE links set ? WHERE id = ?", [newLink, id]);
  req.flash("success", "Link Actualizado Correctamente");
  res.redirect("/links");
});

module.exports = router;
