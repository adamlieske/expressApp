const express = require("express");
const router = express.Router();
const { logAdmin } = require("../config.js");
const { login, password } = logAdmin;

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Logowanie" });
});

router.post("/login", (req, res) => {
  const body = req.body;
  if (body.login === login && body.password === password) {
    req.session.admin = 1;
    res.redirect("/admin");
  } else {
    res.redirect("/login");
    console.log("cos jest nie tak w if");
  }
});

module.exports = router;
