function nav() {
  
  let btnShowNav = document.querySelector("#btn-show-nav");
  let nav = document.querySelector("#nav");
  let btnCloseNav = document.querySelector("#btn-close-nav");

  btnShowNav.addEventListener("click", function() {
    nav.style.height = "100vh";
  });

  btnCloseNav.addEventListener("click", function() {
    nav.style.height = "0";
  });

}

window.addEventListener("load", function() {
  nav();
});