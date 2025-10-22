import { createMovie, deleteMovie, getMovieById, getMovies } from "../controller/movieController.js";


import express from "express";

const router = express.Router();

router.post("/movietomongo", createMovie);

router.get("/", getMovies);
router.get("/getmovie/:id", getMovieById);

router.delete("/:id",deleteMovie);

// this is for testing
router.get("/test", (req,res)=>{
    res.send("Movie to mongo working");
})



export default router;