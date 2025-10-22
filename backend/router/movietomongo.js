import { createMovie, deleteMovie, getMovies } from "../controller/movieController.js";


import express from "express";

const router = express.Router();

router.post("/movietomongo", createMovie);

router.get("/", getMovies);

router.delete("/:id",deleteMovie);

// this is for testing
router.get("/test", (req,res)=>{
    res.send("Movie to mongo working");
})

export default router;