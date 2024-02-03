const User = require("../models/UserModel");

function render(req, res) {
  if (req.session.user) res.redirect("/salas");
  else res.render("login");
}

async function submit(req, res) {
  const user = new User(req.body);

  try {
    await user.login();

    if (user.data) {
      req.session.user = user.data;
      return req.session.save(() => res.redirect("/salas"));
    } else {
      req.flash("error", user.error);
      return req.session.save(() => res.redirect("back"));
    }
  } catch (err) {
    console.error(err);
    req.flash("error", "Não foi possível entrar");
    return req.session.save(() => res.redirect("back"));
  }
}

function logout(req, res) {
  req.session.destroy();
  res.redirect("/");
}

module.exports = { render, submit, logout };
