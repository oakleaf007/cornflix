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

const dropdown = document.querySelector(".drop");
const btn = dropdown.querySelector(".dropdown-btn");
const menu = dropdown.querySelector(".dropdown-content");

btn.addEventListener("click", () => {
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});

menu.querySelectorAll("div").forEach(option => {
  option.addEventListener("click", () => {
    btn.textContent = option.textContent;
    btn.setAttribute("data-value", option.dataset.value);
    menu.style.display = "none";
  });
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