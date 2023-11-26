const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    // _id will also be created implicitly for each instance of this model
    name: { type: String, minLenght: 3, maxLenght: 100},
});

GenreSchema.virtual("url").get(function () {
    return `/catalog/genre/${this._id}`
}); 

module.exports = mongoose.model("Genre", GenreSchema);