const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz.js");

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    const show = !req.session.vote;
    const quizzes = await Quiz.find();
    let sum = 0;
    quizzes.forEach((item) => {
      sum += item.vote;
    });

    res.render("quiz", { title: "Quiz", quizzes, show, sum });
  } catch (err) {
    console.error("Błąd przy dodawaniu quizu: ", err);
    res.status(500).send("Wystąpił błąd serwera");
  }
});

router.post("/", async (req, res) => {
  try {
    const id = req.body.quiz;
    const updatedDocument = await Quiz.findOneAndUpdate(
      { _id: id },
      { $inc: { vote: 1 } },
      { new: true }
    );
    req.session.vote = 1;
    res.redirect("/quiz");
  } catch (err) {
    console.error(err);
    res.status(500).send("Wystąpił błąd serwera", err);
  }
});

module.exports = router;
