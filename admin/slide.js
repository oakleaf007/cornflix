    const slider = document.getElementById("slider");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");

    let index = 0;
    const totalSlides = slider.children.length;
    const visibleSlides = 3;

    function updateSlider() {
      const slideWidth = slider.children[0].offsetWidth;
      slider.style.transform = `translateX(${-index * slideWidth}px)`;
    }

    function nextSlide() {
      if (index < totalSlides - visibleSlides) {
        index++;
      } else {
        index = 0;
      }
      updateSlider();
    }

    function prevSlide() {a
      if (index > 0) {
        index--;
      } else {
        index = totalSlides - visibleSlides;
      }
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

    // Auto slide
    let autoSlide = setInterval(nextSlide, 3000);

    function resetAutoSlide() {
      clearInterval(autoSlide);
      autoSlide = setInterval(nextSlide, 3000);
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
      let diff = e.pageX - startX;
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
      let diff = e.changedTouches[0].pageX - startX;
      if (diff < -50) nextSlide();
      if (diff > 50) prevSlide();
      resetAutoSlide();
    });

    window.addEventListener("resize", updateSlider);