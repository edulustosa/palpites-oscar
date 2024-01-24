const { Router } = require("express");
const { loginRequired } = require("./src/middlewares/middleware");

const routes = Router();

routes.get("/", (_req, res) => res.render("index"));

routes.get("/register", (_req, res) => res.render("register"));

module.exports = routes;
