

import jwt from "jsonwebtoken";



export const auth = function(req,res,next){
    const hdr = req.headers.authorization;
    if(!hdr) return res.status(401).json({message: "No token provided"});

    const token =hdr.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET || "dinosaur", (err,decoded)=>{
        if(err) return res.status(403).json({message:"Invalid or expired token"});
        req.user=decoded;
        next();
    });
       
};