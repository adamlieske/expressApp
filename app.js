const createError = require("http-errors");
const cookieSession = require("cookie-session");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { config } = require("./config");
const mongoose = require("mongoose");
const colors = require("colors");

mongoose
  .connect(config.db)
  .then(() => console.log("Connected to MongoDB".green))
  .catch((err) => console.error("MongoDB connection error:", err.red));

const indexRouter = require("./routes/index");
const newsRouter = require("./routes/news");
const quizRouter = require("./routes/quiz");
const adminRouter = require("./routes/admin");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cookieSession({
    name: "session",
    keys: config.keySession,

    // Cookie Options
    maxAge: config.maxAgeSession, // 24 hours
  })
);

app.use((req, res, next) => {
  res.locals.path = req.path;

  next();
});

app.use("/", indexRouter);
app.use("/news", newsRouter);
app.use("/quiz", quizRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
