module.exports = {
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/signin");
  },

  //   En caso de que el usuario este logeado le bloqueo el acceso a signup
  isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated) {
      return next();
    }
    return res.redirect("/profile");
  },
};
