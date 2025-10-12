import mongoose from "mongoose";

const movieSchema =  new mongoose.Schema({

    mName: {type: String, required: true, trim:true},
    genre: { type: String, required: true, trim: true},
    description:{type: String, required: true, trim: true},
    mLink: { type: String, required: true, trim:true},
    cLink:{type: String, required: true, trim:true}


},{
    timestamps: true,
    
});

const Movie= mongoose.model("Movie", movieSchema);

export default Movie;