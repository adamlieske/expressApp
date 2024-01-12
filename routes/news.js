const express = require("express");
const router = express.Router();
const News = require("../models/news.js");

router.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";

    const data = await News.find({
      title: new RegExp(search.trim(), "i"),
    }).sort({
      created: -1,
    });

    res.render("news", { title: "News", data, search });
  } catch (err) {
    console.error("Error".red, err);
  }
});

module.exports = router;
