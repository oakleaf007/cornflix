import express from "express";
import { signup } from "../controller/userController.js";

const router = express.Router();

router.post("/signup", signup);

router.get("/test",(req,res)=>{
    res.json({message:" user Router working"})
})


export default router;
