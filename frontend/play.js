const play = document.getElementById("overlay2");
const video = document.getElementById("vid");

play.addEventListener("click",()=>{
video.play();
play.classList.add("active");
});

 video.addEventListener("pause", () => {
      play.classList.remove("active");
    });

    video.addEventListener("play", () => {
      play.classList.add("active");
    });