const { Router } = require("express");

const routes = Router();

routes.get("/", (_req, res) => res.render("index"));

module.exports = routes;
