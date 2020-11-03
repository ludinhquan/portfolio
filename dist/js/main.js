const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
// const menuNav = document.querySelector(".menu-nav");
// const menuBranding = document.querySelector(".btn-branding");
// const navItems = document.querySelectorAll(".nav-item");

let showMenu = false;
menuBtn.addEventListener("click", toogleMenu);

function toogleMenu(e) {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");

    showMenu = true;
    return;
  }
  menuBtn.classList.remove("close");
  menu.classList.remove("show");
  showMenu = false;
}
