const User = require("../models/UserModel");

function loginRender(req, res) {
  if (req.session.user) res.redirect("/salas");
  else res.render("login");
}

async function login(req, res) {
  try {
    const user = new User(req.body);
    await user.login();

    if (user.data) {
      req.session.user = user.data;
      return req.session.save(() => res.redirect("/salas"));
    } else {
      req.flash("error", user.error);
      return req.session.save(() => res.redirect("back"));
    }
  } catch (e) {
    console.error(e);
    req.flash("error", "Não foi possível entrar");
    return req.session.save(() => res.redirect("back"));
  }
}

function logout(req, res) {
  req.session.destroy();
  res.redirect("/");
}

module.exports = { loginRender, login, logout };
