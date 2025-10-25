const form = document.getElementById("frm");
const msg = document.getElementById("msg");



async function loadqs(){

    const res = await fetch("/api/questions");

    const data =  await res.json();
const container = document.getElementById("cont");
    const template = document.getElementById("qa");
    container.innerHTML="";
    data.forEach(q=>{
        const clone = template.cloneNode(true);
        clone.style.display =" block";
        clone.querySelector(".qtext").textContent= `Q: ${q.question}`;

        if (q.answer){
            clone.querySelector(".atext").textContent= `A: ${q.answer}`;

        }
        else{
            clone.querySelector(".atext").textContent= "No answer yet...";
        }

         container.appendChild(clone);

    });

      const faqs = document.querySelectorAll(".faq");


  faqs.forEach(faq => {
    faq.addEventListener("click", () => {
      faq.classList.toggle("open");
     
    });
  });

}






form.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const question = document.getElementById("faq-qs").value;

    try{
        const res = await fetch("/api/questions",{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({question}),
        });

        console.log("Response status:", res.status);

        if(res.ok){
            loadqs();
        }

        const data = await res.json();
        msg.textContent = data.message || "Question Submitted";

    
    }
    catch(err){
        msg.textContent = "error Submitting question";
        console.error(err);
    }

});

loadqs();