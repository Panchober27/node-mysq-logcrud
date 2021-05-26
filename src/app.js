const nest = require('nest');
const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session");
const { database } = require("./keys");
const passport = require('passport');


// Inicializaciones.
const app = express();
require('./lib/passport');


// Seteos.
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
// HandleBars Settings.
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);
app.set("view engine", ".hbs");

// Middlewares.
app.use(
  session({
    secret: "panchober27nodeexpresshbscrudsession",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database), // Guardo la sesion en la bd.
  })
);
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());



// Variables Globales.
app.use((req, res, next) => {
  app.locals.success = req.flash("success"); // Guardo el mensaje en todas las vistas!!!
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
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
