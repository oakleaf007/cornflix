import express from "express";
import { auth } from "../middleware/auth.js";
import {getProfile} from "../controller/userController.js";

const router = express.Router();

router.get("/profile", auth, getProfile);





router.get("/test",(req,res)=>{
    res.json({message:" profile Router working"})
})


export default router;
