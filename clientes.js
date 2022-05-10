function modalAdd() {
    let btnShowModalAdd = document.querySelector("#btn-show-modal-add");
    let btnCloseModalAdd = document.querySelector("#btn-close-modal-add");
    let modalAdd = document.querySelector("#modal-add");
    let modalAddForm = document.querySelector("#modal-add-form");

    let sectionsToClose = [
      document.querySelector("#search"),
      document.querySelector("#actions"),
      document.querySelector("#content")
    ];
    

    btnShowModalAdd.addEventListener("click", function() {

      sectionsToClose.map(function(section) {
        section.style.display = "none";
      });

      modalAdd.classList.add("showModalAdd");
    });

    btnCloseModalAdd.addEventListener("click", function() {

      sectionsToClose.map(function(section) {
        section.style.display = "flex";
      });

      modalAdd.classList.remove("showModalAdd");
    });

    modalAddForm.addEventListener("submit", function(e) {
      e.preventDefault();
      alert("helo");
    });
}

window.addEventListener("load", function() {
  modalAdd();
});