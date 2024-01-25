const User = require("../models/UserModel");

function registerRender(req, res) {
  // if (req.session.user) res.redirect("/rooms");
  res.render("register");
}

async function register(req, res) {
  try {
    const user = new User(req.body);

    if (await user.validate()){
      await user.save();
      req.session.user = user.data;

      req.flash("sucess", "Usuário criado");
      return req.session.save(() => res.redirect("/rooms"));
    } else {
      req.flash("error", user.error);
      return req.session.save(() => res.redirect("back"));
    }
  } catch(e) {
    console.error(e);
    req.flash("error", "Desculpe não foi possível criar usuário");
    return req.session.save(() => res.redirect("back"));
  }
}

module.exports = { registerRender, register };
