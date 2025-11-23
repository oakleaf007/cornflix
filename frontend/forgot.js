
const btn = document.getElementById("sendotp");

const msg = document.getElementById("msg");

btn.addEventListener("click", async(e)=>{
    e.preventDefault();

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

    }else{
         msg.style.color="red";
       msg.textContent=data.message;
    }

     }catch(error){
         msg.style.color="red";
       msg.textContent="Server error";
       console.error("error: ", error);
     }


})