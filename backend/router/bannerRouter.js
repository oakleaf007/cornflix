import express from "express";
import {upload} from "../cloudinary.js";
import {sendLink, getBanners, uploadBanner, deleteBanner} from "../controller/bannerController.js";


const router = express.Router();



router.post("/upload",upload.single("banner"),uploadBanner);
router.post("/link",sendLink);
router.get("/",getBanners);
router.delete("/:id", deleteBanner);


export default router;
