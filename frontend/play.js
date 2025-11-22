// play button toggle
const play = document.getElementById("overlay2");
const video = document.getElementById("vid");
const source = document.getElementsByTagName('source');


play.addEventListener("click",()=>{
video.play().catch(err=>{
  console.error("Error Playing video: ",err)
});
play.classList.add("active");
});

 video.addEventListener("pause", () => {
      play.classList.remove("active");
    });

    video.addEventListener("play", () => {
      play.classList.add("active");
    });

// movie loading from backend
async function loadMovie() {
const msg=document.getElementById("overlay2");
  const url = new URLSearchParams(window.location.search);
  const movieId = url.get('id');
  const token = localStorage.getItem("token");
  if(!token){
    return;
  }
  try{
    const res = await fetch(`/api/postmovie/getmovie/${movieId}`,{
      headers:{
        Authorization: "Bearer " + token
      }
    });

    
    if(res.status === 401 || res.status === 403){
      localStorage.removeItem("token");

        
     msg.style.color="#fff";
     msg.style.fontSize="16px";
 
    msg.textContent="Please login to watch , redirecting....";



    setTimeout(()=>{
       window.location.replace("/signin");
    },3000)
     
      return;
    }

    if(!res.ok) throw new Error("Movie not found");
    
    const movie = await res.json();

    const title= document.getElementById("movie-title");
    const desc = document.getElementById("desc");
    const genre = document.getElementById("movie-genre");
    const video = document.getElementById("vid");
    const vid = video.querySelector('source');

    title.textContent=movie.mName;
    
    genre.textContent=`genre: ${movie.genre}`;

    desc.innerHTML=movie.description;

    vid.src = movie.mLink;
    video.load();
   
    
   
    


  }catch(err){


  console.error("Error loading movie: ", err)

    



  
} 
  
} 
window.onload = loadMovie;