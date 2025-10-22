const play = document.getElementById("overlay2");
const video = document.getElementById("vid");

play.addEventListener("click",()=>{
video.play();
play.classList.add("active");
});

 video.addEventListener("pause", () => {
      play.classList.remove("active");
    });

    video.addEventListener("play", () => {
      play.classList.add("active");
    });


async function loadMovie() {

  const url = new URLSearchParams(window.location.search);
  const movieId = url.get('id');

  try{
    const res = await fetch(`/api/postmovie/getmovie/${movieId}`);
    if(!res.ok) throw new Error("Movie not found");

    const movie = await res.json();

    const title= document.getElementById("movie-title");
    const desc = document.getElementById("desc");
    const genre = document.getElementById("movie-genre");
    const vid = document.getElementById("vid");

    title.textContent=movie.mName;
    genre.textContent=`genre: ${movie.genre}`;

    desc.innerHTML=movie.description;

    vid.src = movie.mLink;
   
    
   
    


  }catch(err){
    console.error("Error loading movie: ", err)
  }
  
} 
window.onload = loadMovie;