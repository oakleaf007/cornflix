

async function renderMovies(movies = null, containerSelect ="#container"){

  try{
    if(!movies){
   const res = await fetch("/api/postmovie");
   movies = await res.json();

    }
    
const container = document.querySelector(containerSelect);


if (!container) {
      console.error(`Container not found: ${containerSelect}`);
      return;
    }
const template = document.getElementById("movie-template");

 container.innerHTML = "";

movies.forEach(movie=>{
  const clone = template.cloneNode(true);
  clone.style.display="block";
  clone.id='';

const link = clone.querySelector('.movie-link');
link.href=`/watch?id=${movie._id}`;


const img = clone.querySelector('img');
img.src=movie.cLink;

const title = clone.querySelector('.title');
title.textContent=movie.mName;

container.appendChild(clone);

});


  }catch(err){

    console.error("Error fetching: ", err)

  }

}
// movie search function
async function searchMovies() {
  const query = document.getElementById("searchid").value.trim();

  try {
    const res = await fetch(`/api/postmovie/search?search=${encodeURIComponent(query)}`);
    const data = await res.json();

 
   renderMovies(data, "#movie-container");
   renderMovies(data, "#movie-container2");

  } catch (err) {
    console.error("Error searching movies:", err);
  }
}

// load after dom content load

window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("searchbtn");
  if (btn) btn.addEventListener("click", searchMovies);

 
  renderMovies(null, "#movie-container");
  renderMovies(null, "#movie-container2");
});