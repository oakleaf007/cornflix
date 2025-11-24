
const form = document.getElementById("form");
const passwd = document.getElementById("passwd").value.trim();
const confPass = document.getElementById("conf-passwd").value.trim();
let msg = document.getElementById("msg");
let timer = document.getElementById("timer");




const session = { email: localStorage.getItem("email"),
token:localStorage.getItem("token")};

console.log(session.email,session.token);


if(!session.email || !session.token){
        passwd.disabled=true;
confPass.disabled=true;
msg.textContent="Time is over! Update window is closed, try again with another otp verification.The window will still keep reloading if you stay.";
}

// let sec =60;

// const interval = setInterval(() => {
//     sec--;
//     timer.textContent=`Time remaining: ${sec}`;
// }, 1000);


// setTimeout(()=>{
// localStorage.removeItem("token");
// localStorage.removeItem("email");
//  clearInterval(interval);
// window.location.reload();


// },60000)


form.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const newPass = document.getElementById("passwd").value.trim();
if(!newPass){
    msg.style.color="red";
    msg.textContent="Please Enter password";
    return;
}

if(newPass.value !== confPass.value){
   
   msg.textContent = "password doesn't match";
    return;
  
}
const {email} = session;

try{

    const res = await fetch ("/api/sign/updatepass",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, newPass})
    });

    const data= await res.json();

    if(res.ok){
         msg.style.color="green";
    msg.textContent=data.message;

    
    }else{
          msg.style.color="red";
    msg.textContent=data.message;


    }

}catch(err){
    console.error("Error",err);
    

}


});



const submitBtn= document.getElementById("submitbtn");