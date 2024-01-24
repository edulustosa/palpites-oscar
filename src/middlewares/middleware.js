function global(req, res, next) {
  res.locals.error = req.flash("error");
  res.locals.sucess = req.flash("sucess");
  res.locals.user = 
}

function loginRequired(req, res, next) {
  if (!req.session.user) req.session.save(() => res.redirect("/register"));
  else next();
}

module.exports = { loginRequired };
