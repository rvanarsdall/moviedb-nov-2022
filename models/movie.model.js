const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    movieTitle: String,
    movieDescription: String,
    movieYear: Number,
    isCurrentlyInTheaters: Boolean,
    rating: Number,
    owner_id: {type: mongoose.Types.ObjectId, ref: "User"},
});

module.exports = mongoose.model("Movie", MovieSchema)
