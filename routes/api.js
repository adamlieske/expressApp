const express = require("express");
const router = express.Router();
const News = require("../models/news.js");
const defaultSort = -1;

router.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";
    const sort = req.query.sort || -1;

    if (sort !== -1 && sort !== 1) {
      sort = defaultSort;
    }

    const data = await News.find({
      title: new RegExp(search.trim(), "i"),
    })
      .sort({
        created: sort,
      })
      .select("_id title description");

    res.json(data);
  } catch (err) {
    console.error("Error".red, err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await News.findById(id).select("_id title description");
    res.json(data);
  } catch (err) {
    console.error("Error".red, err);
  }
});

module.exports = router;
