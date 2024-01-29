const User = require("../models/UserModel");

function render(req, res) {
  const predictions = req.session.user.predictions;
  res.render("predictions", { predictions });
}

async function set(req, res) {
  if (req.session.user.predictions) {
    req.flash("error", "Previsões já feitas");
    return req.session.save(() => res.redirect("/salas"));
  }

  try {
    const predictions = req.body;
    const id = req.session.user._id;

    delete predictions._csrf;

    const user = await User.predictions(id, predictions);
    if (user) {
      req.session.user.predictions = user.predictions;
      return req.session.save(() => res.redirect("/salas"));
    } else {
      req.flash("error", "Categorias faltando");
      return req.session.save(() => res.redirect("back"));
    }
  } catch (err) {
    console.error(err);
    req.flash("error", "Não foi possível salvar previsões");
    return req.session.save(() => res.redirect("back"));
  }
}

module.exports = { render, set };
