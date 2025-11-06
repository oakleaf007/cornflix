import express from "express";
import { signup, signin } from "../controller/userController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/test",(req,res)=>{
    res.json({message:" user Router working"})
})


export default router;
