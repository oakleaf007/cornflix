// Movie upload to cloudinary

const form1 = document.getElementById("movie-form");

const statusmsg = document.getElementById("movie-status");

form1.addEventListener("submit", async(e)=>{

    e.preventDefault();
    statusmsg.textContent="Uploading movie...";
    statusmsg.style.color="white";

    const formdata = new FormData(form1);
    try{
        const response = await fetch('/api/movie/upload', {
            method: "POST",
            body: formdata,
        });

        if(response.ok){
            const result= await response.json();
            statusmsg.textContent=result.message;
            statusmsg.style.color="green";
            console.log("server: ", result);
            form1.reset();

         }
          else{
                const errorResult = await response.json();
                statusmsg.textContent=`Upload failed: ${errorResult.message || 'server error'}`;
                statusmsg.style.color = "red";


            }

        }
        catch (err){
            console.error("An error occurred: ", err);
            statusmsg.textContent="An error occurred, check the console";
            statusmsg.style.color="red";

        } 

});

