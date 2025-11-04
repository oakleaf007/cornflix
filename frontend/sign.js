

   let gender="";
   
     document.querySelectorAll(".dropdown-content div").forEach(i=>{
        i.addEventListener("click",()=>{
           gender=i.dataset.value;


     });
     });


document.getElementById("signup-form").addEventListener("submit", async(e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
     const name = document.getElementById("name").value.trim();


     const passwd = document.getElementById("passwd").value.trim();
     const confirm = document.getElementById("confirm-pass").value.trim();
     let msg = document.getElementById("msg");

     msg.textContent="";
     if(!name || !email || !passwd || !gender){
       msg.textContent="";
        msg.textContent="Fields can not be empty!";
        return;
     }

     if(passwd!==confirm){
       msg.textContent="";
        msg.textContent="Confirm password mismatch!";
          msg.style.color = "red";
          return;
     }

     try{
        const res = await fetch("/api/sign/signup",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email,name,gender,pass:passwd,confirm})

        });
        const data= await res.json();
        msg.textContent=data.message;
        msg.style.color=data.ok? "green":"red";

        if(data.ok){
         setTimeout(()=>{
            location.href="/signin";
         }, 1000)
        }

     }catch(err){
        console.error("Error:", err);
        msg.textContent="networs error, try again later"
     }

    

})