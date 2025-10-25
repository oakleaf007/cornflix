 

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


// async function loadQS(){
//     const res = await fetch(api);
//     const data = await res.json();

//     const container = document.getElementById("questions");
//         container.innerHTML="";


//         data.forEach(q=>{
//             const box=document.createElement("div");

//              box.className = "question-box";
             

//         box.innerHTML = `
//           <p style="color:#fff;"><strong >Q:</strong> ${q.question}</p>
//           ${q.answer ? `<p style="color:#fff;"><strong>A:</strong> ${q.answer}</p>` : ""}
//           <div id="answer-box-${q._id}">
//           <button onclick="showAnswerBox('${q._id}', '${q.answer || ""}')" style =" padding:10px; cursor: pointer; background:#fffafa; border:none; border-radius:5px; color:#121212;">
//           ${q.answer ? "Edit Answer" : "Answer"}
//         </button>
//          ${q.answer ? `<button onclick="deleteAnswer('${q._id}')">Delete Answer</button>` : ""}
//     <button onclick="deleteQuestion('${q._id}')">Delete Question</button>
//           </div>
//         `;
//          container.appendChild(box);
//         });
    
// }
 


