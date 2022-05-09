function showNav() {
  
  let btnShowNav = document.querySelector("#btn-show-nav");
  let nav = document.querySelector("#nav");
  let navActions = document.querySelector("#nav-actions");
  let btnCloseNav = document.querySelector("#btn-close-nav");

  btnShowNav.addEventListener("click", function() {
    nav.classList.add("--nav-show");
    navActions.classList.add("--show");
  });

  btnCloseNav.addEventListener("click", function() {
    nav.classList.remove("--nav-show");
    navActions.classList.remove("--show");
  });

}

window.onload = function() {
  showNav();
};
