

document.getElementById("adminlogin").addEventListener("submit", async(e)=>{
    e.preventDefault();

    const email= document.getElementById("email").value;
    const pass= document.getElementById("passwd").value;

    try{

        const res = await fetch('/api/adminlogin/login',{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password: pass})
        });

        const data = await res.json();
        const msg=document.getElementById("msg");

        if(res.ok){
            msg.textContent="login successfull";
            localStorage.setItem("usermail", data.admin.email);
            localStorage.setItem("loggedin", "true");
            window.location.href="/badmin";
            


        }else{
            msg.style.color = "red";
            msg.textContent=data.message;
            
        }
    }
    catch(err){
        console.error(err);

    }
});