
// Error message rendering may have problem else working fine


document.getElementById("movie_form").addEventListener("submit", async(e)=>{
    e.preventDefault();


// get values from the html page

const movieName = document.getElementById("movieName").value.trim();
const genre = document.getElementById("genre").value;
const movieDesc = document.getElementById("movieDesc").value.trim();
const movieLink = document.getElementById("movielink").value.trim();
const coverLink = document.getElementById("cover-link").value.trim();
const msg = document.getElementById("upload-status");

 msg.style.color = "green";
  msg.textContent="";

if(!movieName || !genre || !movieLink || !coverLink){
    msg.textContent="All fields required";
    return;
}

try{
    msg.textContent="uploading";

    const res = await fetch("/api/postmovie/movietomongo",{
    method: "POST",
    headers:{"Content-Type": "application/json",},
    body: JSON.stringify({ 
          mName:movieName,
            genre:genre,
            description :movieDesc,
            mLink :movieLink,
            cLink:coverLink,
            
       
         
        
           
        }),


    });

    const data = await res.json();
  msg.style.color = "green";
   msg.textContent=data.message || data.error;

   
}
    catch(error){
        console.error("Error:",error);
        msg.textContent="Server error, check console for more info";
    }

});

// Fetching movies function with dewlete option

const movieList = document.getElementById("admin-movie");
async function fetchMovies(){
    try{
        const res = await fetch("api/postmovie");
        const movies = await res.json();
        movieList.innerHTML="";

        movies.forEach((movie)=>{

        const row = document.createElement("div");


// eyes up stay charp! variable name shouldnt be deferent from declared variable name
// it will break all the function inside this script except post

      row.classList.add("movie-row");
       row.style.display = "flex";
      row.style.flexWrap = "wrap";
      row.style.alignItems = "center";
      row.style.marginBottom = "10px";
      row.style.width = "100%"; 

       const link = document.createElement("a");
      link.href = movie.mLink;
      link.textContent =  movie.mLink + " : "+  movie.mName || "Untitled Movie";
      link.target = "_blank";

       link.style.marginRight = "10px";
      link.style.maxWidth="90%";
      link.style.overflowWrap = "anywhere";

        const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.classList.add("delete-btn");

     delBtn.textContent = "Delete";
      delBtn.style.background = "white";
      delBtn.style.color = "#121212";
      delBtn.style.border = "none";
      delBtn.style.padding = "10px";
      delBtn.style.cursor = "pointer";
      delBtn.style.borderRadius ="5px";

    //delete event 
    
        delBtn.addEventListener("click", async () => {
        if (confirm(`Delete movie: ${movie.mName}?`)) {
          await deleteMovie(movie._id);
        }
      });
        row.appendChild(link);
      row.appendChild(delBtn);
      movieList.appendChild(row);

        })
    }

    catch(err){
    console.error("Error fetching movies", err);
    movieList.innerHTML="<p>Failed to load</p>";

}



}


// delete movie function, will be called in fetchmovie function with delete button

async function deleteMovie(id) {
  try {
    const res = await fetch(`/api/postmovie/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete movie");
    }

    alert("Movie deleted successfully!");
    fetchMovies(); // refresh list after deleting
  } catch (err) {
    console.error("Error deleting movie:", err);
    alert("Error deleting movie. Check console.");
  }
}



// fetching movies
fetchMovies();





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



