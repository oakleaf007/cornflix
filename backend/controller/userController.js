import User from "../models/user.js"
import bcrypt from "bcryptjs";


// signup for new user
export const signup =async(req, res)=>{

    try {

const { email, name, gender, pass} = req.body;
 if(!email || !pass) return res.status(400).json({message: "Email and passdword required"});


const existingUser = await User.findOne({email});

if(existingUser){
    return res.status(409).json({message: 'Email already registered'});

       

}

const hashpass = await bcrypt.hash(pass, 10);

const newUser = new User({email, name, gender, pass: hashpass});
 await newUser.save();

 res.status(201).json({message: "User created successfully", newUser: {email: newUser.email, name: newUser.name}});


        

    }catch(err){
        console.error(err);
        res.status(500).json({message: " Server error"});

    }
};