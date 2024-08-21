const express = require("express");
const router = express.Router();

const prisma = require("../db/index");

router.post("/books", (req, res) => {
  const { title, year, summary, quantity, genre, authorId } = req.body;
  const newBook = {
    title,
    year,
    summary,
    quantity,
    genre,
    authorId,
  };
  prisma.book
    .create({ data: newBook })
    .then((book) => {
      console.log("book successfully created");
      res.status(201).json(book);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error creating new book" });
    });
});

router.get("/books", (req, res) => {
  prisma.book
    .findMany({ include: { author: true } })
    .then((allBooks) => {
      res.status(200).json(allBooks);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error fetching all books" });
    });
});

router.get("/books/:bookId", (req, res) => {
  const { bookId } = req.params.bookId;
  prisma.book
    .findUnique({ where: { id: bookId }, include: { author: true } })
    .then((book) => {
      if (!book) {
        res.status(404).json({ message: "Book not found" });
      } else {
        res.status(200).json(book);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error fetching book" });
    });
});

router.put("/books/:bookId", (req, res) => {
  const { bookId } = req.params;
  const { title, year, summary, quantity, genre, authorId } = req.body;
  const newBookDetails = {
    title,
    year,
    summary,
    quantity,
    genre,
    authorId,
  };
  prisma.book
    .update({ where: { id: bookId }, data: newBookDetails })
    .then((updatedBook) => {
      res.json(updatedBook);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error updating book" });
    });
});

router.delete("/books/:bookId", (req, res) => {
  const { bookId } = req.params;
  prisma.book
    .delete({ where: { id: bookId } })
    .then(() => {
      res.json({ message: `Book with id ${bookId} was deleted successfully` });
    })
    .catch((err) => {
      console.log("Error deleting a book", err);
      res.status(500).json({ message: "Error deleting a book" });
    });
});

module.exports = router;
