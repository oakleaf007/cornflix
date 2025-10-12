
import{v2 as cloudinary} from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET

    // cloudinary_url: process.env.CLOUDINARY_URL
});

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "banners",
        allowed_formats:["jpg","png","jpeg"]
    }
});


const videoStorage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "videos",
       resource_type: "video",
        allowed_formats:["mp4","mkv","avi", "mov"]

    }
})

const coverStorage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "covers",
        allowed_formats:["jpg","png","jpeg"]
    }
})

const upload = multer({storage});

const uploadVideo = multer({ storage: videoStorage})

const uploadCover = multer({ storage})

export{cloudinary, upload, uploadVideo, uploadCover};




