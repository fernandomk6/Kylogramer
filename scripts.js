function showNav() {
  
  let btnShowNav = document.querySelector("#btn-show-nav");
  let nav = document.querySelector("#nav");
  let btnCloseNav = document.querySelector("#btn-close-nav");

  btnShowNav.addEventListener("click", function() {
    nav.classList.add("--nav-show");
  });

  btnCloseNav.addEventListener("click", function() {
    nav.classList.remove("--nav-show");
  });

}

window.addEventListener("load", function() {
  showNav();
});