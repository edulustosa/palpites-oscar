const { Router } = require("express");
const {
  loginRequired,
  predictionsRequired,
} = require("./src/middlewares/middleware");

const {
  registerRender,
  register,
} = require("./src/controllers/registerController");
const {
  loginRender,
  login,
  logout,
} = require("./src/controllers/loginController");

const predictions = require("./src/controllers/predictionsController");
const api = require("./src/apis/api");

const rooms = require("./src/controllers/roomsController");
const control = require("./src/controllers/oscarController")  ;

const routes = Router();

routes.get("/", (_req, res) => res.render("index"));

routes.get("/cadastro", registerRender);
routes.post("/cadastro", register);

routes.get("/login", loginRender);
routes.post("/login", login);

routes.get("/logout", logout);

routes.get("/previsoes", loginRequired, predictions.render);
routes.get("/api/predictions", loginRequired, api.predictions);
routes.post("/previsoes", loginRequired, predictions.set);

routes.get("/salas", loginRequired, predictionsRequired, rooms.render);
routes.post("/salas/criar", loginRequired, predictionsRequired, rooms.create);
routes.get("/salas/excluir/:id", loginRequired, predictionsRequired, rooms.remove);

routes.get("/api/oscar-result", loginRequired, predictionsRequired, api.oscarResult);
routes.get("/salas/entrar/:id", loginRequired, predictionsRequired, rooms.enter);

routes.get("/control", loginRequired, control.renderLogin);
routes.post("/control/login", loginRequired, control.login);
routes.post("/control", loginRequired, control.newWinner);

module.exports = routes;
