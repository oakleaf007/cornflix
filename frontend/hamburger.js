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

genre.addEventListener("click", async ()=>{
    arrow.classList.toggle("active");
    list.classList.toggle("active");
    genre.classList.toggle("active");
    
      
  
    

}
);

const list2 = document.querySelector(".dropdown");
const genre2 = document.getElementById("genr2");
genre2.addEventListener("click", async ()=>{
    // arrow.classList.toggle("active");
    list2.classList.toggle("active");
    genre2.classList.toggle("active");
    // genre.classList.toggle("active");
    
   
  
    

}
);
document.addEventListener("click", (e) => {


    if(!list.contains(e.target) && !genre.contains(e.target)){
        list.classList.remove("active");
         arrow.classList.remove("active");
    
    genre.classList.remove("active");
    }
  
      if(!navL.contains(e.target) && !ham.contains(e.target)){
        navL.classList.remove("active");
         ham.classList.remove("active");
    }

    if(!list2.contains(e.target) && !genre2.contains(e.target)){
        list2.classList.remove("active");
         genre2.classList.remove("active");
    }
});
// all.addEventListener("click", async ()=>{

//    list.classList.remove("active");
//    all.classList.toggle("active");
//    genre.classList.remove("active");
//     newm.classList.remove("active");
  
    

// }


