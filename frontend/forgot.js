

const btn = document.getElementById("sendotp");

const msg = document.getElementById("msg");


btn.addEventListener("click", async(e)=>{
    e.preventDefault();
msg.style.color="green";
    const email = document.getElementById("email").value.trim();


      if (!email) {
       msg.style.color = "red";
       msg.textContent = "Please enter an email";
        return;
    }
     msg.textContent = "Fetching...";
    try{

   
    const res = await fetch ("/api/sign/sendotp",{
        method: "POST",
        headers:{ "Content-Type": "application/json"},
        body: JSON.stringify({email})

    } );
     msg.style.color="green";
    const data = await res.json();

    

    if(res.ok){
       msg.style.color="green";
       msg.textContent=data.message;
       localStorage.setItem("email",email);
      

    }else{
         msg.style.color="red";
       msg.textContent=data.message;
    }

     }catch(error){
         msg.style.color="red";
       msg.textContent="Server error";
       console.error("error: ", error);
     }


});




const msg2 = document.getElementById("msg2");

const submit = document.getElementById("sendotp2");

submit.addEventListener("click", async(e)=>{
  e.preventDefault();
  msg2.style.color="green";
   msg2.textContent="verifying";
  const email = localStorage.getItem("email");
 
  const otp = document.getElementById("otp").value.trim();
try{
  

  const res = await fetch ("/api/sign/getotp",{
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({email, otp})
  });
  const data = await res.json();
  if(res.ok){
  msg2.style.color="green";
   msg2.textContent=data.message + ", Redirecting...";

  const token= Math.floor(Math.random()*100000).toString();
    
    localStorage.setItem("token",token);
    localStorage.setItem("email",email);
     console.log(token,email);
     setTimeout(()=>{
 window.location.href="/updatepass";
     },2000)
    
   

  }
  else{
    msg2.style.color="red";
    msg2.textContent=data.message;

  }

  }catch(err){
      msg2.style.color="red";
    console.error("error:", err);
     msg2.textContent=err;
  }

})