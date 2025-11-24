import express from "express";
import { signup, signin, sendOtpController, verifyOtp, updatePass } from "../controller/userController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/sendotp", sendOtpController);
router.post("/getotp", verifyOtp);
router.post("/updatepass", updatePass);

router.get("/test",(req,res)=>{
    res.json({message:" user Router working"})
})


export default router;
