const ham = document.querySelector(".ham");
const navL = document.querySelector(".nav2");

ham.addEventListener("click", async () => {
 
    navL.classList.toggle("active");
    ham.classList.toggle("active");
    
   
});

const all = document.getElementById("all");

const newm = document.getElementById("new");

const genre = document.getElementById("genr");
const list = document.querySelector(".genre-cont");
const arrow= document.querySelector(".arrow");



// newm.addEventListener("click", async ()=>{

//    list.classList.remove("active");
//    newm.classList.toggle("active");
//    genre.classList.remove("active");
//     all.classList.remove("active");
  
    

// }
// );

// const mov = document.querySelector(".movie-container")





document.addEventListener("click", (e) => {


 
  
      if(!navL.contains(e.target) && !ham.contains(e.target)){
        navL.classList.remove("active");
         ham.classList.remove("active");
    }

  
});
// all.addEventListener("click", async ()=>{

//    list.classList.remove("active");
//    all.classList.toggle("active");
//    genre.classList.remove("active");
//     newm.classList.remove("active");
  
    

// }


