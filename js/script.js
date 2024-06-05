const cookieBox = document.querySelector(".wrapper"), buttons = document.querySelectorAll(".button");

const executeCodes = () => {
  if (document.cookie.includes("codinglab")) return;
  cookieBox.classList.add("show");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      cookieBox.classList.remove("show");
    });
  });
};

window.addEventListener("load", executeCodes);