async function loadEmail() {
  try {
    const res = await fetch("/api/contact"); // fetch from backend
    const contact = await res.json();

    if (contact && contact.email) {
      const emailLink = document.getElementById("email-id");
      emailLink.textContent = contact.email || ""; // show email text
      emailLink.href = `mailto:${contact.email}`; // make it clickable
    }
      if (contact && contact.email) {
      const emailLink = document.getElementById("email-id2");
      emailLink.textContent = contact.email || ""; // show email text
      emailLink.href = `mailto:${contact.email}`; // make it clickable
    }

    const phone = document.getElementById("ph");
    if(phone){
        phone.textContent = contact.phone || "";
        
    }
    const addr1 = document.getElementById("addr1");
    if(addr1){
        addr1.textContent = contact.address1 || "";
    }
    
    const addr2 = document.getElementById("addr2");
    if(addr2){
        addr2.textContent = contact.address2 || "";
    }


    
  } catch (err) {
    console.error("Failed to load email:", err);
  }
}

loadEmail();
