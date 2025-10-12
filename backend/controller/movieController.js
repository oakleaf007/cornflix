import Movie from "../models/movies.js";

// uploading movie details to mongo


export const createMovie = async(req, res)=>{
    try{
        const {mName, genre, description, mLink, cLink} = req.body;


        if(!mName || !genre || !description || !mLink || !cLink){
            return res.status(400).json({ error:"All fields required"})
        }

        const movie = new Movie({
            mName,
            genre,
            description,
            mLink,
            cLink
        });
        await movie.save();

        res.status(201).json({ message: " Uploaded Successfully ", movie});

    } catch (err){
        res.status(500).json({error: err.message});
    }
};
