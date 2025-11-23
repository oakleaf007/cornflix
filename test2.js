 import crypto from "crypto";
 
 const otp = crypto.randomInt(100000, 999999).toString();
    
 console.log(otp);