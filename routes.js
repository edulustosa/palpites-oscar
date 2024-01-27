const { Router } = require("express");
const {
  loginRequired,
  predictionsRequired,
} = require("./src/middlewares/middleware");

const {
  registerRender,
  register,
} = require("./src/controllers/registerController");
const { loginRender, login, logout } = require("./src/controllers/loginController");

const routes = Router();

routes.get("/", (_req, res) => res.render("index"));

routes.get("/cadastro", registerRender);
routes.post("/cadastro", register);

routes.get("/login", loginRender);
routes.post("/login", login);

routes.get("/logout", logout);

routes.get("/previsoes", loginRequired, (req, res) => res.render("predictions"));
routes.post("/previsoes", loginRequired, (req, res) => console.log(req.body));

routes.get("/salas", loginRequired, predictionsRequired, (req, res) =>
  res.render("rooms")
);

module.exports = routes;
