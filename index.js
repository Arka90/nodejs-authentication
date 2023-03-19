const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
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
const expressLayout = require("express-ejs-layouts");
const app = express();
app.use(express.urlencoded({ extended: true }));
// To see requests in the console
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  session({
    name: "auth-system",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: "false",
    resave: "false",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
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
app.use(expressLayout);
app.use("/", viewsRouter);
app.use("/users", userRouter);

module.exports = app;
