const api = "/api/questions";



// loading the qna
async function loadQS(){
    const res = await fetch(api);
    const data = await res.json();

    const container = document.getElementById("questions");
        container.innerHTML="";


        data.forEach(q=>{
            const box=document.createElement("div");

             box.className = "question-box";
             

        box.innerHTML = `
          <p style="color:#fff;"><strong >Q:</strong> ${q.question}</p>
          ${q.answer ? `<p style="color:#fff;"><strong>A:</strong> ${q.answer}</p>` : ""}
          <div id="answer-box-${q._id}">
          <button onclick="showAnswerBox('${q._id}', '${q.answer || ""}')" style =" padding:10px; cursor: pointer; background:#fffafa; border:none; border-radius:5px; color:#121212;">
          ${q.answer ? "Edit Answer" : "Answer"}
        </button>
         ${q.answer ? `<button onclick="deleteAnswer('${q._id}')">Delete Answer</button>` : ""}
    <button onclick="deleteQuestion('${q._id}')">Delete Question</button>
          </div>
        `;
         container.appendChild(box);
        });
    
}


// for answerbox;


function showAnswerBox(id, existingAnswer = "") {
  const div = document.getElementById("answer-box-" + id);

  div.innerHTML = `
    <textarea id="ans-${id}" rows="2" placeholder="Type answer here...">${existingAnswer}</textarea>
    <br>
    <button onclick="submitAnswer('${id}')">Save</button>
    <button onclick="loadQS()">Cancel</button>
  `;
}

function showAnswer(id){
    const div = document.getElementById("answer-box-"+id);

    div.innerHTML =`
        <textarea id="ans-${id}" rows="2" placeholder="Type answer here..."></textarea>
        <br>
        <button onclick="submitAnswer('${id}')">Submit</button>
        <button onclick="loadQuestions()">Cancel</button>
      `;
}


// deleting answer
async function deleteAnswer(id) {
  if (!confirm("Delete this answer?")) return;
  const empty ="";
  const res = await fetch(api + "/" + id + "/answer", {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({answer: empty}),
  });

  if (res.ok) {
    loadQS();
  } else {
    const data = await res.json();
    alert("Error: " + data.error);
  }
}

// deleting qs
async function deleteQuestion(id) {
  if (!confirm("Delete this question?")) return;
  

  const res = await fetch(api + "/" + id, {
    method:"DELETE"
  });

  if (res.ok) {
    loadQS();
  } else {
    const data = await res.json();
    alert("Error: " + data.error);
  }
}




// submitting answer

const ansmsg = document.getElementById("msg");

async function submitAnswer(id){
    const answer = document.getElementById("ans-"+id).value;

    // if(!answer) return ansmsg.textContent="type answer before post";

    const res = await fetch(api+"/"+id+"/answer",{
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({answer})

    });
    if(res.ok){
        ansmsg.textContent="Answer saved";
        loadQS();
    } else{
        const data = await res.json();
        ansmsg.textContent="Error:"+ data.error;
        

    }
}

loadQS();
