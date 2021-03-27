const express = require("express");
const router = express.Router();

const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth"); // metodo para proteger las rutas.

// Ruta o enrutador a la vista de signup
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

// Ruta o enrutador que recibe los datos del formulario
router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

// Ruta a la vista de login.
router.get("/signin", (req, res) => {
  res.render("auth/signin");
});

// Ruta para recibir los datos del formulario de login
router.post("/signin",  (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    failureFlash: true,
  })(req, res, next);
});

// Ruta cuando el usaurio se registro correctamente
router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});

// Ruta para terminar la sesion del usuario.
router.get("/logout", isLoggedIn,  (req, res) => {
  req.logOut();
  res.redirect("signin");
});

module.exports = router;
