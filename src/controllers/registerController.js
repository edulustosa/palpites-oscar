const User = require("../models/UserModel");

function render(req, res) {
  if (req.session.user) res.redirect("/salas");
  else res.render("register");
}

async function submit(req, res) {
  const user = new User(req.body);

  try {
    if (await user.validate()) {
      await user.save();
      req.session.user = user.data;

      req.flash("success", "Usuário criado");
      return req.session.save(() => res.redirect("/previsoes"));
    } else {
      req.flash("error", user.error);
      return req.session.save(() => res.redirect("back"));
    }
  } catch (e) {
    console.error(e);
    req.flash("error", "Desculpe não foi possível criar usuário");
    return req.session.save(() => res.redirect("back"));
  }
}

module.exports = { render, submit };
