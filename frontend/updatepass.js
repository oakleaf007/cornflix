
const form = document.getElementById("form");
const passwd = document.getElementById("passwd").value.trim();
const confPass = document.getElementById("conf-passwd").value.trim();
let msg = document.getElementById("msg");
let timer = document.getElementById("timer");



 const token = localStorage.getItem("tokenx");
    const email = localStorage.getItem("email");



if(!email || !token){
        passwd.disabled=true;
confPass.disabled=true;
localStorage.removeItem("email");
msg.textContent="Time is up or Update window is closed, try again with another otp verification.";
}

let sec =120;

const interval = setInterval(() => {
    sec--;
    timer.textContent=`Time remaining: ${sec} s`;
}, 1000);


setTimeout(()=>{
localStorage.removeItem("token");
localStorage.removeItem("email");
 clearInterval(interval);
window.location.reload();


},120000)


form.addEventListener("submit", async(e)=>{
    e.preventDefault();


    const newPass = document.getElementById("passwd").value.trim();
const email = localStorage.getItem("email");
const token = localStorage.getItem("tokenx");

if(!email || !token){
        passwd.disabled=true;
confPass.disabled=true;
msg.style.color="red";
msg.textContent="Time is up or Update window is closed, try again with another otp verification.";
return;
}

if(!newPass){
    msg.style.color="red";
    msg.textContent="Please Enter password";
    return;
}

if(newPass.value !== confPass.value){
   
   msg.textContent = "password doesn't match";
    return;
  
}




msg.style.color="green";
msg.textContent="updating...";

 
try{
    
    const res = await fetch ("/api/sign/updatepass",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, newPass,id: token})
    });

    const data= await res.json();

    if(res.ok){
         msg.style.color="green";
    msg.textContent=data.message + ", Redirecting to signin...";
    localStorage.removeItem("tokenx");
    localStorage.removeItem("email");
    setTimeout(()=>{
        
        window.location.href="/signin";
    },3000)

    
    }else{
          msg.style.color="red";
    msg.textContent=data.message;
  


    }

}catch(err){
    console.error("Error",err);
    

}


});



