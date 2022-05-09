function showNav() {
  let btnShowNav = document.querySelector("#btn-show-nav");
  let nav = document.querySelector("#nav");

  btnShowNav.addEventListener("click", function(e) {
    nav.classList.toggle("--show");
    nav.classList.toggle("nav--mobile");
  });

}

window.addEventListener("load", showNav);
