function global(req, res, next) {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("sucess");
  res.locals.user = req.session.user;
  console.log(req.session.user);
  next();
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
  loginRequired,
  predictionsRequired,
  csrf,
  checkCsrfError,
};
