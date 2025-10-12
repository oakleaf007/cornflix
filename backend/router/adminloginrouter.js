import express from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/Adminx.js"

const router = express.Router();

router.post("/login", async(req, res)=>{
    const { email, password} = req.body;

    if(!email|| !password) return res.status(400).json({message: "email and password required"});


    try {
        const existingAdmin = await Admin.findOne({});

        if(!existingAdmin){
            const hashpass = await bcrypt.hash(password,10);

            const admin = new Admin({email, password: hashpass});

            await admin.save();
            return res.status(201).json({message: "Admin created", admin: {email: admin.email}});

        } else{
            if(existingAdmin.email != email){
                return res.status(401).json({message: "invalid credentials"});

            }

            const match = await bcrypt.compare(password, existingAdmin.password);
            if(!match) return res.status(401).json({message: "invalid credentials"});

            res.json({
                message: "Admin logged in", admin :{ email: existingAdmin.email}
            });
        }
    }
    catch (err){
        console.error(err);

            
        res.status(500).json({message: "server error"});
        
    }
});

export default router;

