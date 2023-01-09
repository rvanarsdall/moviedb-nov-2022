const router = require("express").Router();
const Movie = require("../models/movie.model");
const validateSession = require("../middleware/validate-session");
router.post("/add", validateSession, async (req, res) => {
  try {
    const movie = new Movie({
      movieTitle: req.body.movieTitle,
      movieDescription: req.body.movieDescription,
      movieYear: req.body.movieYear,
      isCurrentlyInTheaters: req.body.isCurrentlyInTheaters,
      rating: req.body.rating,
      owner_id: req.user._id,
    });
    const newMovie = await movie.save();
    res.json({
      movie: newMovie,
      message: "Movie was added to collection",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get("/owner", validateSession, async (req, res) => {
  try {
    const movie = await Movie.find({ owner_id: req.user._id });
    res.json({ movie: movie, message: "success" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get("/", validateSession, async (req, res) => {
  try {
    const movie = await Movie.find().populate("owner_id", "firstName lastName");
    res.json({ movie: movie, message: "success" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.delete("/:id", validateSession, async (req, res) => {
  try {
    const movieRecord = await Movie.findById(req.params.id);

    if (!movieRecord) throw new Error("Record Does Not Exist");
    const isValidOwner = movieRecord.owner_id.equals(req.user._id);

    // const isValidOwner = req.user._id == movieRecord.owner_id;
    if (!isValidOwner) {
      throw new Error(
        "The id supplied for movie record is not owned by this user. Movie wasn't deleted"
      );
    }
    // const isOwner =  await Movie.find({_id: req.params.id, owner_id: req.user._id}).length == 0

    // if(!isOwner){
    //     throw new Error ("The id supplied for movie record is not owned by this user. Movie wasn't deleted")
    // }

    // console.log(isOwner)
    const deletedMovie = await Movie.deleteOne({
      _id: req.params.id,
      owner_id: req.user._id,
    });
    res.json({
      deletedMovie: deletedMovie,
      message:
        deletedMovie.deletedCount > 0
          ? "Movie was deleted"
          : "Movie was not removed",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.patch("/update/:id", validateSession, async (req, res) => {
  try {
    const filter = { _id: req.params.id, owner_id: req.user._id };
    const update = req.body;
    const returnOptions = { new: true };
    const movie = await Movie.findOneAndUpdate(filter, update, returnOptions);

    res.json({
      message: movie ? "movie updated" : "movie was not updated",
      movie: movie ? movie : {},
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});
// Get one
router.get("/:id", validateSession, async (req, res) => {
  try {
    const movie = await Movie.findById({ _id: req.params.id });
    res.status(200).json({
      movie: movie,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
