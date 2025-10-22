// async function loadBanner() {
//     const res = await fetch("/api/banners");
//     const banners = await res.json();

//     const container = document.getElementById("slide");

//    banners.forEach(banner=>{
//     const cloneDiv = container.cloneNode(true);
//     const a = document.getElementById("slide-a");
//     a.href = banner.linkUrl;

//     const
//    }) 
// }

 const bannerForm = document.getElementById('banner-form');
 const uploadStatus = document.getElementById('uploadstatus');
  bannerForm.addEventListener('submit', async (event) => {

     event.preventDefault();
     uploadStatus.textContent = 'Uploading, please wait...';
        uploadStatus.style.color = 'white';


        const formData = new FormData(bannerForm);
        

        try {
           
            const response = await fetch('/api/banners/upload', {
                method: 'POST',
                body: formData,
            });

          
            if (response.ok) {
                const result = await response.json();
                uploadStatus.textContent = 'Upload successful!';
                uploadStatus.style.color = 'green';
                console.log('Server response:', result);
                bannerForm.reset();
                
            } else {
                const errorResult = await response.json();
                uploadStatus.textContent = `Upload failed: ${errorResult.message || 'Server error'}`;
                uploadStatus.style.color = 'red';
            }

        } catch (err) {
          
            console.error('An error occurred:', err);
            uploadStatus.textContent = 'An error occurred during upload. Check the console.';
            uploadStatus.style.color = 'red';
        }

  });


const alink = document.getElementById("alink");
const form2 = document.getElementById("banner-link");
 const linkInput = document.getElementById("link-input");
 const msg2 = document.getElementById("linkstatus");
form2.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const data = {
        url: linkInput.value,
        alink: alink.value
    };
    try{
        const res = await fetch("/api/banners/link",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

       const result = await res.json();
        msg2.textContent = result.message || result.error;
        
    }catch(error){
        msg2.textContent="error:"+ error.message;
         msg2.style.color ="red";
    }


});


async function loadBanners() {
  const slider = document.getElementById("slider");
  const template = document.getElementById("slide-template");

  try {
    const res = await fetch("/api/banners");
    const banners = await res.json();

    // Clear old slides
    slider.innerHTML = "";

    banners.forEach(banner => {
      const clone = template.cloneNode(true);
      clone.id = ""; // remove duplicate id

      const a = clone.querySelector("a");
      const img = clone.querySelector("img");

      a.href = banner.alink;
      a.target="_blank";   // the link you saved
      img.src = banner.url;     
      img.alt = "Banner";

      slider.appendChild(clone);
    });
    bannerslider();

  } catch (err) {
    console.error("Error loading banners:", err);
    slider.innerHTML = "<p>Error loading banners</p>";
  }
}

// Call on page load

function bannerslider() {
  const slider = document.getElementById("slider");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const visibleSlides = 3;

  let index = 0;
  let autoSlide;

  function updateSlider() {
    const slides = slider.children;
    if (slides.length === 0) return;
    const slideWidth = slides[0].offsetWidth;
    slider.style.transition = "transform 0.5s ease";
    slider.style.transform = `translateX(${-index * slideWidth}px)`;
  }

  function nextSlide() {
    const totalSlides = slider.children.length;
    index = (index + 1) % totalSlides; // always loop
    updateSlider();
  }

  function prevSlide() {
    const totalSlides = slider.children.length;
    index = (index - 1 + totalSlides) % totalSlides; // loop backward
    updateSlider();
  }

  next.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  prev.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });

  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 3000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  // Drag/Swipe support
  let startX = 0;
  let isDown = false;

  slider.addEventListener("mousedown", e => {
    isDown = true;
    startX = e.pageX;
    slider.style.cursor = "grabbing";
    clearInterval(autoSlide);
  });

  slider.addEventListener("mouseup", e => {
    if (!isDown) return;
    isDown = false;
    const diff = e.pageX - startX;
    if (diff < -50) nextSlide();
    if (diff > 50) prevSlide();
    slider.style.cursor = "grab";
    resetAutoSlide();
  });

  slider.addEventListener("touchstart", e => {
    startX = e.touches[0].pageX;
    clearInterval(autoSlide);
  });

  slider.addEventListener("touchend", e => {
    const diff = e.changedTouches[0].pageX - startX;
    if (diff < -50) nextSlide();
    if (diff > 50) prevSlide();
    resetAutoSlide();
  });

  window.addEventListener("resize", updateSlider);

  updateSlider();
  startAutoSlide();
}


// Call bannerslider **after banners are loaded dynamically**


loadBanners();






// 
async function loadAdminBanners() {
  const container = document.getElementById("admin-banners");
  container.innerHTML = ""; // clear old content

  try {
    const res = await fetch("/api/banners");
    const banners = await res.json();

    banners.forEach(banner => {
      // create banner div
      const div = document.createElement("div");
      div.style.display = "flex";
      div.style.flexWrap = "wrap";
      div.style.alignItems = "center";
      div.style.marginBottom = "10px";
      div.style.width = "100%"; // full width of parent


      // create link
      const link = document.createElement("a");
      link.href = banner.url;
      link.target = "_blank";
      link.textContent = banner.url;
      link.style.marginRight = "10px";
      link.style.maxWidth="90%";
      link.style.overflowWrap = "anywhere";
    
     

      // create delete button
      const btn = document.createElement("button");
      btn.textContent = "Delete";
      btn.style.background = "white";
      btn.style.color = "#121212";
      btn.style.border = "none";
      btn.style.padding = "10px";
      btn.style.cursor = "pointer";
      btn.style.borderRadius ="5px";

      // delete action
      btn.addEventListener("click", async () => {
        try {
          const delRes = await fetch(`/api/banners/${banner._id}`, {
            method: "DELETE"
          });
          const result = await delRes.json();
          alert(result.message);
          loadAdminBanners(); // reload after deletion
        } catch (err) {
          console.error(err);
          alert("Failed to delete banner");
        }
      });

      // append link and button to div
      div.appendChild(link);
      div.appendChild(btn);

      // append div to container
      container.appendChild(div);
    });

  } catch (err) {
    console.error("Error loading banners:", err);
    container.innerHTML = "<p>Error loading banners</p>";
  }
}

// load on page load
loadAdminBanners();

