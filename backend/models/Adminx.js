import  mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    
    email:{ type: String,  required: true},
    password: { type: String, required: true}

});

const Adminx = mongoose.model("Adminx", adminSchema);
export default Adminx;
