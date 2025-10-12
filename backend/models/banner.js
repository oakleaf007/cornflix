import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
   
    url: {type:String, required:true, trim:true},
    alink: {type: String, required: true, trim: true}

}, {timestamps: true});

export default mongoose.model("Banner", bannerSchema);