function global(req, res, next) {}

function loginRequired(req, res, next) {
  if (!req.session.user) res.redirect("/register");
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

module.exports = { loginRequired, csrf, checkCsrfError };
