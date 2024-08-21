const express = require("express");
const router = express.Router();

const prisma = require("../db/index");

router.post("/authors", (req, res) => {
  const { firstName, lastName, bio } = req.body;
  const newAuthor = {
    firstName,
    lastName,
    bio,
  };
  prisma.author
    .create({ data: newAuthor })
    .then((author) => {
      console.log("author created successfully");
      res.status(201).json(author);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to create author" });
    });
});

module.exports = router;
