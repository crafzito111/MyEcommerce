// Scroll
export const header = document.getElementById("header");

if (header) {
   window.addEventListener("scroll", function () {
      if (window.scrollY >= 50) {
         header.classList.add("header__scroll");
      } else {
         header.classList.remove("header__scroll");
      }
   });
}
