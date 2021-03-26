const express = require("express");
const router = express.Router();

const passport = require("passport");

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

// Ruta cuando el usaurio se registro correctamente
router.get("/profile", (req, res) => {
  res.send("This is your Profile");
});

module.exports = router;
