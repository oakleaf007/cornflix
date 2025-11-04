import { createMovie, deleteMovie, getMovieById, getMovies } from "../controller/movieController.js";


import express from "express";
import Movie from "../models/movies.js";

const router = express.Router();

router.post("/movietomongo", createMovie);

router.get("/", getMovies);
router.get("/getmovie/:id", getMovieById);

router.delete("/:id",deleteMovie);

router.get("/search", async(req, res)=>{
    const search = req.query.search?.toLowerCase() || "";
    const searched = await Movie.find({
        mName: {$regex: search, $options : "i"}
    });
    res.json(searched);
})

// this is for testing
router.get("/test", (req,res)=>{
    res.send("Movie to mongo working");
})



export default router;