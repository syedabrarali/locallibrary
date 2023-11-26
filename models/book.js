const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    // _id will also be created implicitly for each instance of this model
    title: { type: String, required: true},
    author: { type: Schema.Types.ObjectID, ref: "Author", required: true},
    summary: { type: String, required: true},
    isbn: { type: String, required: true},
    genre: [{ type: Schema.Types.ObjectID, ref: "Genre"}],
});

BookSchema.virtual("url").get(function() {
    return `/catalog/book/${this._id}`;
});

module.exports = mongoose.model("Book", BookSchema);