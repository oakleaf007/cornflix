import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import path from "path";



// router import

import contactRoute from "./router/contactRoute.js";

import helpRoute from "./router/helpRouter.js";

import bannerRoute from "./router/bannerRouter.js";

import movieRoute from "./router/movieRouter.js";

import coverRoute  from "./router/coverRouter.js";

import uploadMovieRoute from "./router/movietomongo.js";

import adminloginroute from "./router/adminloginrouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());




// mongo connection


console.log("mongo URI:", process.env.mongouri);

mongoose.connect(process.env.mongouri)
    .then(()=>console.log("Mongo connected"))
    .catch((err)=>console.error("Mongo error:",err));




// serving apis


app.use("/api/contact", contactRoute);

app.use("/api/questions", helpRoute);

app.use("/api/banners",bannerRoute);

app.use("/api/movie", movieRoute);

app.use("/api/cover", coverRoute);

app.use("/api/postmovie",uploadMovieRoute);


app.use("/api/adminlogin", adminloginroute)




// serving webpages


app.use("/",express.static("frontend"));



 app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "frontend","index.html"));
});

 app.get("/home", (req, res) => {
  res.sendFile(path.join(process.cwd(), "frontend","home.html"));
});

 app.get("/help", (req, res) => {
  res.sendFile(path.join(process.cwd(), "frontend","help.html"));
});

 app.get("/signin", (req, res) => {
  res.sendFile(path.join(process.cwd(), "frontend","signin.html"));
});

 app.get("/signup", (req, res) => {
  res.sendFile(path.join(process.cwd(), "frontend","signup.html"));
});

// admin serving

app.use("/adminx", express.static(path.join(process.cwd(), "admin")));


app.get("/xadminx",(req, res)=>{
    res.sendFile(path.join(process.cwd(),"admin","adminx-login.html"));
});
app.get("/helpx",(req, res)=>{
    res.sendFile(path.join(process.cwd(),"admin","admin-help.html"));

});

app.get("/badmin",(req, res)=>{
    res.sendFile(path.join(process.cwd(),"admin","adminx.html"));
});




// server

const port =  5000;
app.listen(port, '0.0.0.0',()=>{
     console.log("Server running on localhost:5000")
    })