import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


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

        
        const token = jwt.sign( {id: user._id, email: user.email},
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