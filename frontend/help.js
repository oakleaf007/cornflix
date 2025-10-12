
  const textarea = document.querySelector("textarea");

  textarea.addEventListener("input", () => {
    textarea.style.height = "auto";            // reset
    textarea.style.height = textarea.scrollHeight + "px"; // set to scroll height
  });