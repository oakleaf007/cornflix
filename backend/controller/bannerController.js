import Banner from "../models/banner.js";


// uploading banner to cloudinary
export const uploadBanner = async( req,res)=>{
    try{

         if (!req.file) {
           
            return res.status(400).json({ error: "File not uploaded." });
        }

        // this is useless if u r not retrieving the link automatically
        // currently doing it manually
        const imageUrl = req.file.path;
        const linkUrl = req.body.link;

       
        

       res.status(200).json({
    message: "Image uploaded successfully.",

    imageUrl: req.file.path
  });

    } catch (error){
        res.status(500).json({error: "upload failed", details: error.message});

    }
};


// this post link to mongo database

export const sendLink = async (req, res)=>{
    try{
        const {url, alink} = req.body;

        if (!url || url.trim()===''){
            return res.status(400).json({message:"A non-empty link is req before send"});

        }

         const newBanner = new Banner({ url, alink });
        await newBanner.save();

        res.status(201).json({
            message: "Link saved to Database",
             banner: newBanner ,
        });
    }catch(error){
          console.error("Error saving link to MongoDB:", error);
    res.status(500).json({
      error: "Failed to save link to database.",
      details: error.message,
    });
    }
};


// this loads banners from mongo

export const getBanners = async(req,res)=>{
    try{
        const banners = await Banner.find().sort({createdAt:-1});
        res.json(banners);
    } catch (error){
        res.status(500).json({error: "failed to fetch banners"});
    }
};

// this removes banner with link in mongo
export const deleteBanner = async(req, res)=>{
    try{
        const deleted = await Banner.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({message:"Banner not found"});
        res.json({message: "Banner deleted succesfully"});
    }
    catch (err){
        console.error(err);
        res.status(500).json({message:"Failed to delete banner"});
    }
};