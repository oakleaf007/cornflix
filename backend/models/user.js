import mongoose from "mongoose";

const user = new mongoose.Schema({
    email : {type: String, required: true},
    name: {type:String},
    gender: {type: String},
    pass: { type: String, required: true}

});
const User = mongoose.model("User",user);
export default User;