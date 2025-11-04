import mongoose from "mongoose";

const user = new mongoose.Schema({
    email : {type: String, required: true},
    name: {type:String},
    gender: {type: String},
    pass: { type: String, required: true},
    confirm: { type: String}

});
const User = mongoose.model("User",user);
export default User;