const OscarWinner = require("../models/OscarModel");

function renderLogin(req, res) {
  const access = req.session.access;
  res.render("oscar", { access });
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    if (await OscarWinner.login(email, password)) {
      req.session.access = true;
      return req.session.save(() => res.redirect("/control"));
    } else {
      req.session.access = false;
      req.flash("error", "Você não tem acesso a essa sala");
      return req.session.save(() => res.redirect("/"));
    }
  } catch (err) {
    console.error(err);
    req.flash("error", "Você não tem acesso a essa sala");
    return req.session.save(() => res.redirect("/"));
  }
}

async function newWinner(req, res) {
  if (!req.session.access) {
    req.flash("error", "Você não tem acesso a essa sala");
    return req.session.save(() => res.redirect("/"));
  }

  delete req.body._csrf;
  const winner = new OscarWinner(req.body);

  try {
    await winner.save(req.session.user.email);
    return res.redirect("/salas");
  } catch (err) {
    console.error(err);
    req.flash("error", "Erro no salvamento");
    return req.session.save(() => res.redirect("back"));
  }
}

module.exports = { renderLogin, newWinner, login };
