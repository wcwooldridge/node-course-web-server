const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile(`server.log`, log + "\n", err => {
    if (err) {
      console.log("unable to append to log file");
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render("maintenance.hbs", {
    pageTitle: "Under Maintenance",
    message: "Site is under maintenance. Try again later"
  });
});
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    message: "This is the super cool web site!",
    currentYear: new Date().getFullYear()
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page",
    currentYear: new Date().getFullYear()
  });
});

app.get("/bad", (req, res) => {
  res.send({ errorMessage: "Bad Request" });
});

app.listen(3000, () => {
  console.log("Server up on 3000");
});
