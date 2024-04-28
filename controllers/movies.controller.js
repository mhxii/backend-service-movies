const db = require("../models");
const Movie = db.movies;

// Create and Save a new Student
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Student
  const movie = new Movie({
    title: req.body.title,
    date: req.body.date,
    
  });

  // Save movie in the database
  movie
    .save(movie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the movie.",
      });
    });
};

// Retrieve all movies from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  Movie.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movies.",
      });
    });
};

// Find a single movie with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Movie.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found movie with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving movie with id=" + id });
    });
};

// Update a movie by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update movie with id=${id}. Maybe movie was not found!`,
        });
      } else res.send({ message: "Stu"});
    });
};