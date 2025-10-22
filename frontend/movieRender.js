

async function renderMovies(){

  try{
    const res = await fetch("/api/postmovie");
    const movies = await res.json();

const container = document.querySelectorAll("#movie-container");

const template = document.getElementById("movie-template");
container.forEach(container=>{


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
});

  }catch(err){

    console.error("Error fetching: ", err)

  }

}

window.onload = renderMovies;