
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