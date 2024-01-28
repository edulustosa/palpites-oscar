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
const predictions = require("./src/controllers/predictionsController");
const sendUserPredictions = require("./src/apis/predictionsAPI");

const routes = Router();

routes.get("/", (_req, res) => res.render("index"));

routes.get("/cadastro", registerRender);
routes.post("/cadastro", register);

routes.get("/login", loginRender);
routes.post("/login", login);

routes.get("/logout", logout);

routes.get("/previsoes", loginRequired, predictions.render);
routes.get("/api/predictions", loginRequired, sendUserPredictions);
routes.post("/previsoes", loginRequired, predictions.set);

routes.get("/salas", loginRequired, predictionsRequired, (req, res) =>
  res.render("rooms")
);

module.exports = routes;
