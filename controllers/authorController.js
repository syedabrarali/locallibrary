const Author = require('../models/author');
const Book = require("../models/book");
const asyncHandler = require('express-async-handler');


//display list of all authors
exports.author_list = asyncHandler(async function (req, res, next) {
    const allAuthors = await Author.find().exec();
    console.log(allAuthors);
    res.render("author_list", { title: "Author List", author_list: allAuthors})
});

//display detail page for a sepcific author
exports.author_detail = asyncHandler(async (req, res, next) => {
    const [author, allBooksByAuthor] = await Promise.all([
      Author.findById(req.params.id).exec(),
      Book.find({ author: req.params.id }, "title summary").exec()
    ]);

    if(author === null) {
      //No results
      const err = new Error("No author found");
      err.status = 404;
      return next(err);
    }
    
      res.render("author_detail", { 
        title: "Author Detail",
        author: author,
        author_books: allBooksByAuthor,
      });
});

//display author create form on GET request
exports.author_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author create GET");
});

// Handle Author create on POST.
exports.author_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author create POST");
});

// Display Author delete form on GET.
exports.author_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
});

// Handle Author delete on POST.
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
});

// Display Author update form on GET.
exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update GET");
});

// Handle Author update on POST.
exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update POST");
});