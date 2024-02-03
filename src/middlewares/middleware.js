function global(req, res, next) {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
}

function notFoundHandler(_req, res) {
  res.status(404).render("404");
}

function loginRequired(req, res, next) {
  if (!req.session.user) res.redirect("/cadastro");
  else next();
}

function predictionsRequired(req, res, next) {
  if (!req.session.user.predictions) res.redirect("/previsoes");
  else next();
}

function csrf(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
}

function checkCsrfError(err, req, res, next) {
  if (err) return res.render("404");
  next();
}

module.exports = {
  global,
  notFoundHandler,
  loginRequired,
  predictionsRequired,
  csrf,
  checkCsrfError,
};
