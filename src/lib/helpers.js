const bcrypt = require("bcryptjs");
const helpers = {};

// Encriptar la password del usuario.
helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // las veces que se cifra la password
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

// Comparando contraseña recibida con la pass de la bd.
helpers.matchPassword = async (password, savedPassword) => {
  try {
    await bcrypt.compare(password, savedPassword);
  } catch (err) {
    console.log(err);
  }
};

module.exports = helpers;
