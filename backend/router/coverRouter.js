import express from "express";
import { uploadCover } from "../cloudinary.js";
import { coverUpload } from "../controller/coverUpload.js";

const router = express.Router();


router.post("/cover",uploadCover.single("cover"), coverUpload )


export default router;