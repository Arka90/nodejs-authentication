const express = require("express");
const morgan = require("morgan");
const path = require("path");

const userRouter = require("./routes/userRoutes");
const viewsRouter = require("./routes/viewRoutes");
const session = require("express-session");
const store = require("connect-mongo");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMware = require("./config/middleware");
const app = express();
app.use(express.urlencoded({ extended: true }));
// To see requests in the console
app.use(morgan("dev"));

app.use(
  session({
    name: "auth-system",
    secret: "highlysecretvalue",
    saveUninitialized: "false",
    resave: "false",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017",
      autoRemove: "disabled",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "assets")));

app.use("/", viewsRouter);
app.use("/users", userRouter);

module.exports = app;
