const express = require("express");
const router = express.Router();
const News = require("../models/news.js");

router.all("*", (req, res, next) => {
  if (!req.session.admin) {
    res.redirect("login");
    return;
  }
  next();
});

router.get("/", (req, res) => {
  try {
    res.render("admin/index", { title: "Admin" });
  } catch (err) {
    console.error(err);
  }
});

router.get("/news/add", (req, res) => {
  try {
    res.render("admin/news-form", { title: "Dodaje news" });
  } catch (err) {
    console.error("Error".red, err);
  }
});

router.post("/news/add", async (req, res) => {
  try {
    const body = req.body;
    const newsData = new News(body);
    const errors = newsData.validateSync();
    console.log(errors);
    console.log(body);

    await newsData.save();
    console.log(`DODANO ${body.title} DO BAZY DANYCH`.bgGreen);
    res.redirect("/news"); // Przekierowanie po pomyślnym dodaniu.
  } catch (err) {
    console.error("Error".red, err);
    res.render("admin/news-form", {
      title: "Wystąpił Błąd",
      errors: err.errors,
      body,
    });
  }
});

module.exports = router;
