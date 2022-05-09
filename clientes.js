function Add() {
    let btnAdd = document.querySelector("#btn-add");

    btnAdd.addEventListener("click", function() {
      alert("Não clique em mim maldito!!");
    });
}

window.addEventListener("load", function() {
  Add();
});