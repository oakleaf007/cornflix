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


document.getElementById("signin-form").addEventListener("submit", async(e)=>{
   e.preventDefault();


   const email = document.getElementById("email").value.trim();
   const password = document.getElementById("passwd").value.trim();
   const msg = document.getElementById("msg");

if(!email || !password){
msg.textContent="email or password required";
return;
}



try{
   const res = await fetch("/api/sign/signin",{
    method:  "POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({email:email, pass:password})
   });

const data = await res.json();

   if(res.ok){
    msg.textContent="Login successfull, redirecting...";
    msg.style.color="green";
    const fl = data.user.name.charAt(0).toUpperCase();
    localStorage.setItem("username", fl);
     localStorage.setItem("token", data.token);
    setTimeout(()=>{
      window.location.href="/home";

    },1000);

   } else{
    msg.style.color ="red";
    msg.textContent=data.message;
   }
   
}catch(err){
  console.error("Error: ", err);

}

});
