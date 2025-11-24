 import crypto from "crypto";
 
 const otp = crypto.randomInt(100000, 999999).toString();
    
 console.log(otp);

  const token= Math.floor(Math.random()*100000).toString();
  console.log(token);