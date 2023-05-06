const express = require("express");
const { BookModel } = require("../models/book.models");

const BookRoutes = express.Router();
const { validator } = require("../middlewares/validator.middleware");
const jwt = require("jsonwebtoken");

BookRoutes.get("/books", async (req, res) => {
  const { category, author } = req.query;

  try {
    if (category && author) {
      try {
        const booksData = await BookModel.find({$and:[{author:author},{category:category}]});
        res.status(200).send({booksData})
      } catch (err) {
        res.status(400).send({ err: err.message });
      }
    } else if (category) {
      try {
        const booksData = await BookModel.find({ category: category });
      } catch (err) {
        res.status(400).send({ err: err.message });
      }
    } else {
      try {
        const books = await BookModel.find();
        res.status(200).send({ books });
      } catch (err) {
        res.status(400).send({ err: err.message });
      }
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

BookRoutes.get("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const bookData = await BookModel.find({ _id: id });
    res.status(200).send(bookData[0]);
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

BookRoutes.post("/books", validator, async (req, res) => {
  const payload = req.body;
  try {
    let newBook = new BookModel(payload);
    newBook.save();
    res.status(200).send("added successfully");
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

BookRoutes.patch("/books/:id", validator, async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    const bookData = await BookModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).send({ msg: "Book details updated" });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

BookRoutes.delete("/books/:id", validator, async (req, res) => {
  const { id } = req.params;

  try {
    const bookData = await BookModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Book has been deleted" });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = { BookRoutes };
