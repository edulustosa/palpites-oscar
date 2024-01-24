const express = require("express");
const app = express();

const session = require("express-session");
const flash = require("connect-flash");

const routes = require("./routes");
const path = require("path");
const middlewares = require("./src/middlewares/middleware");

const csrf = require("csurf");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

// app.use(csrf());
// app.use(middlewares.checkCsrfError);
// app.use(middlewares.csrf);

app.use(routes);

app.listen(5000, () => console.log("Acessar site aqui: http://localhost:5000"));
