const { Router } = require("express");
const {
  loginRequired,
  predictionsRequired,
} = require("./src/middlewares/middleware");

const register = require("./src/controllers/registerController");
const login = require("./src/controllers/loginController");

const predictions = require("./src/controllers/predictionsController");
const api = require("./src/apis/api");

const rooms = require("./src/controllers/roomsController");
const oscar = require("./src/controllers/oscarController");

const routes = Router();

routes.get("/", (_req, res) => res.render("index"));

routes.get("/cadastro", register.render);
routes.post("/cadastro", register.submit);

routes.get("/login", login.render);
routes.post("/login", login.submit);
routes.get("/logout", login.logout);

routes.get("/previsoes", loginRequired, predictions.render);
routes.get("/api/predictions", loginRequired, api.predictions);
routes.post("/previsoes", loginRequired, predictions.set);

routes.get("/salas", loginRequired, predictionsRequired, rooms.render);
routes.post("/salas/criar", loginRequired, predictionsRequired, rooms.create);
routes.get(
  "/salas/excluir/:id",
  loginRequired,
  predictionsRequired,
  rooms.remove
);

routes.get(
  "/api/oscar-result",
  loginRequired,
  predictionsRequired,
  api.oscarResult
);
routes.get(
  "/salas/entrar/:id",
  loginRequired,
  predictionsRequired,
  rooms.enter
);

routes.get("/control", loginRequired, oscar.render);
routes.post("/control/login", loginRequired, oscar.login);
routes.post("/control", loginRequired, oscar.newWinner);

module.exports = routes;
