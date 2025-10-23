// load only  local storage item valid for security
const loggedIn = localStorage.getItem("loggedin");

if(loggedIn != "true"){
    window.location.href ="/xadminx";
}

document.getElementById("signout").addEventListener("click", (e) => {
  e.preventDefault(); 

 
  localStorage.removeItem("loggedin");
  localStorage.removeItem("usermail");

 
  window.location.href = "/xadminx"; 
});



document.getElementById("signout2").addEventListener("click", (e) => {
  e.preventDefault(); 

 
  localStorage.removeItem("loggedin");
  localStorage.removeItem("usermail");

 
  window.location.href = "/xadminx"; 
});




const form = document.getElementById("contact-form");
const emailInput = document.getElementById("adminEmail");
const phoneInput = document.getElementById("adminPhone");
const addressInput = document.getElementById("adminAddress");
const addressInput2 = document.getElementById("adminAddress2");
const msg = document.getElementById("msg");

// contact load
async function load(){
    try{
        const res = await fetch ("/api/contact");
        const contact = await res.json();
        if(contact){
            emailInput.value = contact.email || "";
            phoneInput.value = contact.phone || "";
            addressInput.value = contact.address1 || "";
            addressInput2.value = contact.address2 || "";
        }
    } catch(err){
        msg.textContent="failed to load Existing contact";

    }
}


// submitting and updating the contact details
form.addEventListener("submit", async(e)=>{
    e.preventDefault();

    const data ={
        email: emailInput.value,
        phone: phoneInput.value,
        address1:addressInput.value,
        address2:addressInput2.value
    };

    try{
        const res = await fetch("/api/contact",{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(data)

        });

        const result = await res.json();

        msg.textContent = result.message || result.error;

    } catch(err){
        msg.textContent="error:"+ err.message;
        msg.style.color ="red";
    }
});

load();