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

router.get("/", async (req, res) => {
  try {
    const data = await News.find();
    res.render("admin/index", { title: "Admin", data });
  } catch (err) {
    console.error("Error".red, err);
  }
});

router.get("/news/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    await News.findByIdAndDelete(id);
    console.log(`USUNIĘTO ${id} Z BAZY DANYCH`.bgYellow);
    res.redirect("/admin");
  } catch (error) {
    console.error("Error deleting data ".red, err);
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
  const body = req.body;
  const newsData = new News(body);
  const errors = newsData.validateSync();

  if (errors) {
    //brak uzupełnionego pola required
    return res.render("admin/news-form", {
      title: "Dodaje news",
      errors: errors.errors,
      body, // Dane, które użytkownik wprowadził w formularzu
    });
  }

  try {
    await newsData.save();
    console.log(`DODANO ${body.title} DO BAZY DANYCH`);
    res.redirect("/admin"); // Przekierowanie po pomyślnym dodaniu
  } catch (err) {
    console.error("Error", err);
    res.render("admin/news-form", {
      title: "Wystąpił Błąd",
      errors: err.errors, // Błędy, jeśli save() zwróci wyjątek
      body: body,
    });
  }
});

module.exports = router;
