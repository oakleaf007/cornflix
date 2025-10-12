const ham = document.querySelector(".ham");
const navL = document.querySelector(".nav2");

ham.addEventListener("click", async () => {
 
    navL.classList.toggle("active");
    ham.classList.toggle("active");
    
   
});



document.addEventListener("click", (e) => {
  
      if(!navL.contains(e.target) && !ham.contains(e.target)){
        navL.classList.remove("active");
         ham.classList.remove("active");
    }

});


const toggle = document.getElementById("visible");

toggle.addEventListener("click", function (){
  let passwd = document.getElementById("passwd");

  if(this.checked){
    passwd.type = "text";

  }
  else{
    passwd.type = "password";
  }


});