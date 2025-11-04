window.addEventListener("load", function(){
const loader = this.document.getElementById("loader");

loader.style.transition = "opacity 0.5s ease";
loader.style.opacity =0;

loader.addEventListener("transitionend",()=>{

    loader.style.display="none";

});

});