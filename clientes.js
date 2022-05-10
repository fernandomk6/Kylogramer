function modalAdd() {
  let btnShowModalAdd = document.querySelector("#btn-show-modal-add");
  let btnCloseModalAdd = document.querySelector("#btn-close-modal-add");
  let modalAdd = document.querySelector("#modal-add");
  let modalAddForm = document.querySelector("#modal-add-form");
  let modalMessage = document.querySelector("#modal-message");
  let modalMessageText = document.querySelector("#modal-message p");
  let inputAddNome = document.querySelector("#add-nome");
  let inputAddTelefone = document.querySelector("#add-telefone");

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

    inputAddNome.value = "";
    inputAddTelefone.value = "";

    modalAdd.classList.remove("showModalAdd");
  });

  modalAddForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const cliente = {
      nome: inputAddNome.value,
      telefone: inputAddTelefone.value
    }

    if(!cliente.nome) {
      modalMessageText.innerHTML += "Nome em branco <br>";
    }
    if(!cliente.telefone) {
      modalMessageText.innerHTML += "Telefone em branco <br>";
    }
    if(modalMessageText.innerHTML === "") {
      alert("tudo ok");
      return;
    }
    
    modalMessage.style.display = "block";

  });
}

function modalMessage() {
  let btnCloseModalMessage = document.querySelector("#btn-close-modal-message");
  let modalMessage = document.querySelector("#modal-message");
  let modalMessageText = document.querySelector("#modal-message p");

  btnCloseModalMessage.addEventListener("click", function() {
    modalMessageText.innerHTML = "";
    modalMessage.style.display = "none";
  });
}

window.addEventListener("load", function() {
  modalAdd();
  modalMessage();
});