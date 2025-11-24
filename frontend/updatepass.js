
const form = document.getElementById("form");
const passwd = document.getElementById("passwd");
const confPass = document.getElementById("conf-passwd");
let msg = document.getElementById("msg");


const email = localStorage.getItem("email");
const token = localStorage.getItem("token");

console.log(email,token);


if(!email || !token){
        passwd.disabled=true;
confPass.disabled=true;
msg.textContent="Congrates, You successfully get Into the update password field, now what? try enterring your mum's number";
}



form.addEventListener("submit", function(e){
    e.preventDefault();

if(passwd.value === confPass.value){
   
    msg.textContent ="password changed! redirecting...";

    setTimeout(()=>{
        window.location.href="signin.html";
    },2000)
}
else{
    msg.textContent = "password doesn't match";
}
});



const submitBtn= document.getElementById("submitbtn");