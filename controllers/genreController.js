const Genre = require("../models/genre");
const Book = require("../models/book");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Genre.
exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenre = await Genre.find().sort({ name: 1}).exec();

  res.render("genre_list", {title: "Genre List", genre_list: allGenre});
});

// Display detail page for a specific Genre.
exports.genre_detail = asyncHandler(async (req, res, next) => {
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec(),
  ]);
  if( genre === null) {
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  };

  res.render("genre_detail", {
    title: "Genre Detail",
    genre: genre,
    genre_books: booksInGenre,
  });
});

// Display Genre create form on GET.
exports.genre_create_get = (req, res, next) => {
  res.render("genre_form", { title: "Create Genre"});
};

// Handle Genre create on POST. Here instead of one middlerware function we're
//calling an array of middleware functions
exports.genre_create_post = [
  //Validate and sanitize the name field. Middleware function 1
  body("name", "Genre name must contain at least 3 characters")
    .trim() //gets rid of whitespace from start & end
    .isLength({ min: 3 }) //the input should have atleast 3 characters.
    .escape(), //escape what is inputted to prevent cross site scripting attack.

    //Middleware function 2
  asyncHandler( async (req, res, next) => {
    //extract validation errors from a request.
    const errors = validationResult(req);

    //create a genre object with escaped and trimmed data.
    const genre = new Genre({
      name: req.body.name
    });

    if(!errors.isEmpty()) {
      //there are errors. Render the form again with sanitized values/error messages.
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array()
      });
      return;
    } else {
      //data from form is valid.
      //check if Genre with same name already exists.
      const genreExists = await Genre.findOne({ name: req.body.name }).exec();
      if(genreExists) {
        //Genre exists, redirect to its details page.
        res.redirect(genreExists.url);
      } else {
        await genre.save();
        //new genre saved, redirect to the new genre detail page.
        res.redirect(genre.url);
      }
    }
  }),
];

// Display Genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
});

// Handle Genre delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
});

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

// Handle Genre update on POST.
exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});
