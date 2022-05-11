async function sendResquest(url, method, body) {

  let response = await fetch(url, {
    method: method,
    body: body
  });

  response = await response.json();
  return response;
}

function modalAdd() {
  let btnShowModalAdd = document.querySelector("#btn-show-modal-add");
  let btnCloseModalAdd = document.querySelector("#btn-close-modal-add");
  let modalAdd = document.querySelector("#modal-add");
  let modalAddForm = document.querySelector("#modal-add-form");
  let modalMessage = document.querySelector("#modal-message");
  let modalMessageText = document.querySelector("#modal-message p");
  let inputAddNome = document.querySelector("#add-nome");
  let inputAddTelefone = document.querySelector("#add-telefone");
  let tbody = document.querySelector("#tbody");
  const tdActions = `<div class="td td--actions">
                    <button class="btn btn--icon">
                      <span class="material-symbols-outlined">
                        delete
                      </span>
                    </button>
                    <button class="btn btn--icon">
                      <span class="material-symbols-outlined">
                        edit
                      </span>
                    </button>
                  </div>`;

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

    if(!inputAddNome.value) {
      modalMessageText.innerHTML += "Nome em branco <br>";
    }
    if(!inputAddTelefone.value) {
      modalMessageText.innerHTML += "Telefone em branco <br>";
    }
    if(!(modalMessageText.innerHTML === "")) {
      modalMessage.style.display = "block";
      return;
    }

    formData = new FormData(this);

    sendResquest("./API/cliente.php", "post", formData).then(function(data) {

      inputAddNome.value = "";
      inputAddTelefone.value = "";

      modalAdd.classList.remove("showModalAdd");

      sectionsToClose.map(function(section) {
        section.style.display = "flex";
      });

      tbody.innerHTML = "";
      data.map(function(cliente) {

        let tdNome = document.createElement("div");
        tdNome.classList.add("td");
        let tdTelefone = document.createElement("div");
        tdTelefone.classList.add("td");

        tdNome.innerHTML = cliente.nome;
        tdTelefone.innerHTML = cliente.telefone;

        let tr = document.createElement("div");
        tr.classList.add("tr");

        tr.appendChild(tdNome);
        tr.appendChild(tdTelefone);
        tr.innerHTML += tdActions;
  
        tbody.appendChild(tr);
        
      });

      console.log(data);
    });

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