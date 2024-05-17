const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const cache = require('nocache');
const router = require('./router');
const nocache = require("nocache");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

//load static asset
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(nocache())
app.use(session({
  secret: uuidv4(),
  resave: false,
  saveUninitialized: true
}));


app.use('/', router)

//home route
app.get("/", (req, res) => {
  //res.render("base", { title: "Login system" });
  res.redirect('/route/login');
});

app.listen(port, () => console.log("server listening http://localhost:3000"));
