import User from "../models/user.js"
import bcrypt from "bcryptjs";


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