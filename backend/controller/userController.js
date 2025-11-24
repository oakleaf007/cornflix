import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendOtp from "../services/email.js";

import crypto from "crypto";

// signup for new user
export const signup =async(req, res)=>{

    try {

const { email, name, gender, pass, confirm} = req.body;
 if(!email || !pass || !gender || !name || !confirm) return res.status(400).json({message: "All field required"});


const existingUser = await User.findOne({email});

if(existingUser){
    return res.status(409).json({message: 'Email already registered'});

}
if(pass !== confirm){
    return res.json({ok:false, message: "confirm password not matched"});
}


const hashpass = await bcrypt.hash(pass, 10);

const newUser = new User({email, name, gender, pass: hashpass});
 await newUser.save();

 res.status(201).json({ok: true,message: "User created successfully", newUser: {email: newUser.email, name: newUser.name}});


        

    }catch(err){
        console.error(err);
        res.status(500).json({message: " Server error"});

    }
};


// this is for login
export const signin = async(req,res)=>{
    try{
        const {email, pass} = req.body;

        if(!email || !pass){
            return res.status(400).json({message:"Email and password required"});

             
        }
        const user = await User.findOne({email});

        if(!user){
          return  res.status(404).json({message: "User not found , Please register."})
        }

        const validPass = await bcrypt.compare(pass, user.pass);
        if(!validPass){
           return res.status(401).json({message: "Invalid Credential"});
        }

        
        const token = jwt.sign( {id: user._id, email: user.email, name : user.name},
            process.env.JWT_SECRET || "dinosaur",
         {expiresIn: "1h"});

            res.status(200).json({message: "login successfull",
                 token,
                  user:{id: user._id, name: user.name, email:user.email
                    
                  }});

    }catch(err){
            console.log("Error: ", err);
        return res.status(500).json({message:"Server Error"});

    }
    
};

// sending otp

export const sendOtpController= async(req, res)=>{
    try{

  
    const {email}= req.body;

    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = otp;
    user.otpExpires = Date.now()+5*60*1000;
    await user.save();

    await sendOtp(email,otp);
    res.json ({message: "OTP sent" , mailid: user.email});

}
  
catch(err){
    console.error("error during sending otp", err);
    res.status(500).json({message: "server error"});
}
};

// verify otp and proceed to update 
export const verifyOtp = async(req, res)=>{

    try{

        const {email ,otp} = req.body;

        if(!otp || !email){
            return res.status(400).json({

            message: "Please provide otp"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "user not found"});

        }

        if(!user.otpExpires || user.otpExpires<Date.now()){
            return res.status(400).json({ message: "otp expired"});
        }

        if(user.otp !==otp){
            return res.status(400).json({message: "Invalid OTP"});
        }
        user.otp = null;
        user.otpExpires=null;
        await user.save();

        return res.status(200).json({message: "OTP verified successfully", mailid: user.email, id: user.id});
    }catch(err){
console.error("Error during otp verification", err);
    res.status(500).json({message: "Server error"});
    }

};

// update password
export const updatePass = async(req,res)=>{
    try{
        const {email, newPass, id} = req.body;
        if(!email || !newPass || !id) {
            return res.status(400).json({message: "update window closed", id});

        }
        

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "No user found"});

        }
        if(user._id.toString() !== id){
            return  res.status(404).json({message: "possible XSS attack or  exploitation detected, try hard"});
        }
        const hashed = await bcrypt.hash(newPass,10);

        user.pass = hashed;
        await user.save();

        if(user.otp){
            user.otp = undefined;
            user.otpExpires= undefined;
            await user.save();
        }
        return res.status(200).json({message: "Password updated successfully"});

    }catch(err){
        console.error(err);
        return res.status(500).json({message: "Internal Server error"})

    }
}


// getprofile for frontend
export const getProfile =async(req,res)=>{

    res.json({
        message: "profile loaded",
        id:req.user.id,
        email:req.user.email,
        name: req.user.name
    });
};