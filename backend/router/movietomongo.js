import { createMovie } from "../controller/movieController.js";


import express from "express";

const router = express.Router();

router.post("/movietomongo", createMovie)

router.get("/test", (req,res)=>{
    res.send("Movie to mongo working");
})

export default router;