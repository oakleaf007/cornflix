import mongoose from "mongoose";

const helpSchema = new mongoose.Schema({
    question:{type: String, required:true},
    answer:{type: String, default:""},
      createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });


export default mongoose.model("Help",helpSchema);

