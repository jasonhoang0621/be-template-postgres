const createError = require("http-errors");
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const routerCustom = require("./routes/index.js");
const website = fs.readFileSync("view/index.html");
const database = require("./utils/database");
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.static("./view"));
app.use(cors());
// app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

database.connectDatabase(() => {
  console.log("connect database success");
});

routerCustom.bindRouter(app);

app.get("/*", (req, res) => {
  res.send(website);
});

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

app.listen(PORT, function () {
  console.log("Begin listen on port %s...", PORT);
});
module.exports = app;
