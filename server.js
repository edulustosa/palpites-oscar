require("dotenv").config();

const express = require("express");
const app = express();
const moongoose = require("mongoose");

moongoose
  .connect(process.env.CONNSTRING)
  .then(() => {
    console.log("Database conectada");
    app.emit("Db connected");
  })
  .catch((e) => console.error(e));

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const routes = require("./routes");
const path = require("path");
const middlewares = require("./src/middlewares/middleware");

const csrf = require("csurf");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "hhJfsw88vXADlZoCBDL86ZGMnq",
    store: MongoStore.create({ mongoUrl: process.env.CONNSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
  })
);

app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(middlewares.global);
app.use(csrf());
app.use(middlewares.csrf);
app.use(middlewares.checkCsrfError);

app.use(routes);

app.on("Db connected", () => {
  app.listen(process.env.PORT, () =>
    console.log("Acessar site aqui: http://localhost:5000")
  );
});
