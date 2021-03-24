const express = require("express");
const morgan = require("morgan");
const path = require("path");

// Inicializaciones.
const app = express();

// Seteos.
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Variables Globales.
app.use((req, res, next) => {
  next();
});

// Rutas.
app.use(require("./routes/index"));
app.use(require("./routes/authentication"));
app.use("/links", require("./routes/links"));

// Archivos Estaticos.
app.use(express.static(path.join(__dirname, "public")));

// Prendiendo  Servidor
app.listen(app.get("port"), () => {
  console.log("Servidor iniciado en puerto: " + app.get("port"));
});
