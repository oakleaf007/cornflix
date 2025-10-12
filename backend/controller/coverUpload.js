

// uploading Cover to cloudinary
export const coverUpload =(req, res)=>{
    try{
        if(!req.file){
            return res.status(400).json({message: "cover not uploaded"});
        }
        res.status(200).json({message:"Cover uploaded successfully"});

        
    }
    catch(err){
        console.error("server error: ", err);
        res.status(500).json({message: "server error"});
    }

};