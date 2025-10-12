
const form = document.getElementById("form");
const passwd = document.getElementById("passwd");
const confPass = document.getElementById("conf-passwd");
let msg = document.getElementById("msg");



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

