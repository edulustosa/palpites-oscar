require("dotenv").config();
const path = require("path");

const express = require("express");
const moongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();
const PORT = process.env.PORT;

moongoose
  .connect(process.env.CONNSTRING)
  .then(() => {
    console.log("Database conectada");
    app.emit("Db connected");
  })
  .catch((e) => console.error(e));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.CONNSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

const routes = require("./routes");
const middlewares = require("./src/middlewares/middleware");
const flash = require("connect-flash");
const csrf = require("csurf");

app.use(flash());
app.use(middlewares.global);
app.use(csrf());
app.use(middlewares.csrf);
app.use(middlewares.checkCsrfError);

app.use(routes);
app.use(middlewares.notFoundHandler);

app.on("Db connected", () => app.listen(PORT));
