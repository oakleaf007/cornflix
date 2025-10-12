import { uploadVideo} from "../cloudinary.js";


// uploading movie to cloudinary
export const uploadMovie=(req,res)=>{
    try{
    if(!req.file){
        return res.status(400).json({message: "no video uploaded"})
    }

    res.status(200).json({
        message:"Video uploaded successfully",
       
    });
}
catch(err){
    console.error("server error: ",err);
    res.status(500).json({message: "server error"});
}
};