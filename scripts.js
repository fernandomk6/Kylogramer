function showNav() {
  let btnHamburguerNav = document.querySelector("#btn-hamburguer-nav");
  let navUl = document.querySelector("#nav ul");

  btnHamburguerNav.addEventListener("click", function(e) {
    navUl.classList.toggle("show");
  });
}

function showModalAdd() {
  let btnAdd = document.querySelector("#btn-add");

  if(!btnAdd) {
    return;
  }
  
  btnAdd.addEventListener("click", function() {
    alert("clicou");
  });
}

window.addEventListener("load", showNav);
window.addEventListener("load", showModalAdd);