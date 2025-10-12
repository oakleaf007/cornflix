import { uploadVideo } from "../cloudinary.js";
import { uploadMovie } from "../controller/movieUpload.js";


import express from "express";

const router = express.Router();



router.post("/upload", uploadVideo.single("file"), uploadMovie);


export default router;