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


// fetching controller
export const getMovies = async(req, res)=>{
    try{
        const movies = await Movie.find().sort({createdAt:-1});
        res.status(200).json(movies);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
};

export const getMovieById = async (req, res)=>
{
    try{
        const { id } = req.params;
        const movie = await Movie.findById(id);
        if(!movie) return res.status(404).json({error: "Movie not found"});
        res.status(200).json(movie);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};



// delete controller
export const deleteMovie = async(req,res)=>{
    try{
        const {id} =req.params;

        const deletedMovie = await Movie.findByIdAndDelete(id);
        if(!deletedMovie) return res.status(400).json({error: "movie not found"});

         res.status(200).json({message:"Movie deleted"});
    
    }catch(err){
        res.status(500).json({error: err.message});
    }
   ;
}
