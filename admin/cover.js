const coverForm = document.getElementById("movie-cover");
const coverStatus = document.getElementById("cover-status");


coverForm.addEventListener("submit", async(e)=>{
    e.preventDefault();

    coverStatus.textContent="Uploading Cover image....";
    coverStatus.style.color="white";

    const formdata = new FormData(coverForm);

    try{
        const res = await fetch("/api/cover/cover",{
            method: "POST",
            body: formdata

        });

        if(res.ok){
            const result = await res.json();
            coverStatus.textContent=result.message;
            coverStatus.style.color="green";
            console.log("server", result);
            coverForm.reset();

        }
        else{
            const errorResult = await res.json();
            coverStatus.textContent=`Upload failed: ${errorResult.message || 'server error'}`;
            coverStatus.style.color="red";

        }
    }catch(error){
        console.error("An error occurred", error);
        coverStatus.textContent="server error, check console";
        coverStatus.style.color="red";


    }
});