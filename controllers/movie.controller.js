const router = require("express").Router();
const Movie = require("../models/movie.model");
const validateSession = require("../middleware/validate-session")
// localhost:4000/movie/add
// POST request

router.post("/add", validateSession, async (req, res) => {
  try {
    // prepping the movie object to be saved to the data base
    const movie = new Movie({
      movieTitle: req.body.movieTitle,
      movieDescription: req.body.movieDescription,
      movieYear: req.body.movieYear,
      isCurrentlyInTheaters: req.body.isCurrentlyInTheaters,
      rating: req.body.rating,
      owner_id: req.user._id
    });
    // we need to save the movie to the database
    const newMovie = await movie.save();

    res.json({ movie: newMovie, message: "movie was saved" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get('/owner', validateSession, async(req, res) => {

  try {
    const movie = await Movie.find({owner_id: req.user._id})
    res.json({ movie: movie, message: 'success' })
  } catch(error) {
    res.json({ message: error.message })
  }
})
// ? Build a route to get all the movie data ("/")
//? Method: GET
// ? Test the route
// localhost:4000/movie/

router.get("/", validateSession, async (req, res) => {
  try {
    const movie = await Movie.find();
    res.json({ movie: movie, message: "Success" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//? Create a route for delting a movie
//? route endpoint will be ("/:id")
//? localhost:4000/movie/
//? Method: Delete

router.delete('/:id',validateSession, async(req, res) => {
  try {

    const movieRecord = await Movie.findById(req.params.id)

    if(!movieRecord) throw new Error ("Record Does Not Exist")

    const isValidOwner = req.user._id == movieRecord.owner_id
    if(!isValidOwner){
        throw new Error ("The id supplied for movie record is not owned by this user. Movie wasn't deleted")
    }
    // const isOwner =  await Movie.find({_id: req.params.id, owner_id: req.user._id}).length == 0

    // if(!isOwner){
    //     throw new Error ("The id supplied for movie record is not owned by this user. Movie wasn't deleted")
    // }

    // console.log(isOwner)
    const deletedMovie = await Movie.deleteOne({_id: req.params.id, owner_id: req.user._id})
    res.json({ 
      deletedMovie: deletedMovie,
      message: deletedMovie.deletedCount > 0 ? "movie was deleted" : "movie was not removed"
    })
  } catch(error) {
    res.json({ message: error.message })
  }
})

//? Build a route for updating a record (UPDATE or PATCH)
//? router.patch with endpoint of "/update/:id"
//? Validate with a console.log(req.params)
//? Full url  http://localhost:4000/movie/update/6321001b1537f4ec1450c738
// ! You supply the record ID in the url
//! In the body you supply what is needed to update.

router.patch("/update/:id", validateSession, async (req, res) => {
  try {
    const filter = { _id: req.params.id, owner_id: req.user._id };

    const update = req.body;

    const returnOptions = { new: true };

    const movie = await Movie.findOneAndUpdate(filter, update, returnOptions);

 
    res.json({
      message: movie ? 'movie updated': "movie was not updated",
      movie: movie ? movie : {}
    })

  } catch (error) {
    res.json({ message: error.message });
  }
});

//? Create an endpoint that will get a record by it's id
//? Endpoint should be ("/:id")
//? Full URL is localhost:4000/movie/6320c5faa7bd064137bcfbcc
//? Method: GET

router.get("/:id", validateSession, async (req, res) => {
  try {
      const movie = await Movie.findById({ _id: req.params.id });
      res.status(200).json({
          movie: movie, message:"Success"
      })
  }
  catch (error) {
      res.status(500).json({ message: error.message });   
  }
})
module.exports = router;
