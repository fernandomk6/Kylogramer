class Client {

  constructor() {
    this.ClientPageTitleAddBtn("client__page-title__add__btn");
    this.ClientInsertFormSubmitBoxCancel("client__insert__form__submit-box__cancel");
    this.ClientInsertForm("client__insert__form", this.clientContentCardActionsBoxAction);
    this.ClientGetAll(this.clientContentCardActionsBoxAction);
  };

  ClientPageTitleAddBtn(id) {
    let el = document.getElementById(id);

    let clientInsert = document.getElementById("client__insert");

    let sections = [
      document.getElementById("client__page-title"),
      document.getElementById("client__search"),
      document.getElementById("client__content")
    ];

    el.onclick = function() {

      for (const section of sections) {
        section.classList.add("--hide");
      }

      clientInsert.classList.remove("--hide");

    }

  };

  ClientInsertFormSubmitBoxCancel(id) {
    let el = document.getElementById(id);

    let clientInsertFormErrorBox = document.getElementById("client__insert__form__error-box");
    let clientInsert = document.getElementById("client__insert");
    let clientInsertForm = document.getElementById("client__insert__form");
    let clientName = clientInsertForm.querySelector("#client-name");
    let clientPhone = clientInsertForm.querySelector("#client-phone");
    let sections = [
      document.getElementById("client__page-title"),
      document.getElementById("client__search"),
      document.getElementById("client__content")
    ];

    el.onclick = function() {

      clientName.value = "";
      clientPhone.value = "";
      clientInsertFormErrorBox.innerHTML = "";

      clientInsert.classList.add("--hide");

      for (const section of sections) {
        section.classList.remove("--hide");
      }

    }

  }

  ClientInsertForm(id, clientContentCardActionsBoxAction) {
    let el = document.getElementById(id);

    let clientInsertFormErrorBox = el.querySelector("#client__insert__form__error-box");
    let clientInsert = document.getElementById("client__insert");
    let clientName = el.querySelector("#client-name");
    let clientPhone = el.querySelector("#client-phone");
    let clientContent = document.getElementById("client__content");
    let sections = [
      document.getElementById("client__page-title"),
      document.getElementById("client__search"),
      document.getElementById("client__content")
    ];

    el.onsubmit = function(e) {

      e.preventDefault();

      clientInsertFormErrorBox.innerHTML = "";
      let errors = [];
      
      if(clientName.value == "" ) {
        let span = document.createElement("span");
        span.classList.add("client__insert__form__error-box__error");
        span.innerHTML = "Nome invalido";
        errors.push(span);
      }

      if(clientPhone.value == "" ) {
        let span = document.createElement("span");
        span.classList.add("client__insert__form__error-box__error");
        span.innerHTML = "Telefone em invalido";
        errors.push(span);
      }

      if(errors.length > 0){
        for (const error of errors) {
          clientInsertFormErrorBox.appendChild(error);
        }
        return;
      } 

      let formData = new FormData(el);

      fetch("./API/client/index.php", {
        method: "POST",
        headers: {
          ContentType: "application/json"
        },
        body: formData
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {

          clientContent.innerHTML = "";
          for (const client of data) {

            let newClientCard =  `
              <div class="client__content__card">
                <div class="client__content__card__id-box">
                  <span class="client__content__card__id-box__title">Id</span>
                  <p class="client__content__card__id-box__content">${client.id}</p>
                </div>
                <div class="client__content__card__name-box">
                  <span class="client__content__card__name-box__title">Nome</span>
                  <p class="client__content__card__name-box__content">${client.nome}</p>
                </div>
                <div class="client__content__card__phone-box">
                  <span class="client__content__card__phone-box__title">Telefone</span>
                  <p class="client__content__card__phone-box__content">${client.telefone}</p>
                </div>
                <div class="client__content__card__actions-box">
                  <button data-method="PUT" data-id="${client.id}" class="client__content__card__actions-box__action">Editar</button>
                  <button data-method="DELETE" data-id="${client.id}" class="client__content__card__actions-box__action">Excluir</button>
                </div>
              </div>
            `;

            clientContent.innerHTML = clientContent.innerHTML + newClientCard;

          } 

          clientContentCardActionsBoxAction();

        })
        .catch(function(error) {
          console.log(error);
        });

        clientName.value = "";
        clientPhone.value = "";

        clientInsert.classList.add("--hide");

        for (const section of sections) {
          section.classList.remove("--hide");
        }
    }

  }

  ClientGetAll(clientContentCardActionsBoxAction) {
    let clientContent = document.getElementById("client__content");

    fetch("./API/client/index.php")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {

        clientContent.innerHTML = "";

        for (const client of data) {

          let newClientCard =  `
            <div class="client__content__card">
              <div class="client__content__card__id-box">
                <span class="client__content__card__id-box__title">Id</span>
                <p class="client__content__card__id-box__content">${client.id}</p>
              </div>
              <div class="client__content__card__name-box">
                <span class="client__content__card__name-box__title">Nome</span>
                <p class="client__content__card__name-box__content">${client.nome}</p>
              </div>
              <div class="client__content__card__phone-box">
                <span class="client__content__card__phone-box__title">Telefone</span>
                <p class="client__content__card__phone-box__content">${client.telefone}</p>
              </div>
              <div class="client__content__card__actions-box">
                <button data-id="${client.id}" data-method="PUT" class="client__content__card__actions-box__action">Editar</button>
                <button data-id="${client.id}" data-method="DELETE" class="client__content__card__actions-box__action">Excluir</button>
              </div>
            </div>
          `;

          clientContent.innerHTML = clientContent.innerHTML + newClientCard;

        } 

        // edit delete events
        clientContentCardActionsBoxAction();

      })
      .catch(function(error) {
        console.log(error);
      });
    
  }

  clientContentCardActionsBoxAction() {
    let actions = document.getElementsByClassName("client__content__card__actions-box__action");

    for (const action of actions) {
      if (action.dataset.method == "DELETE") {
        action.onclick = function() {
          alert("Deletar" + action.dataset.id);
        }
      }
      if (action.dataset.method == "PUT") {
        action.onclick = function() {
          alert("Editar"  + action.dataset.id);
        }
      }
    }
  }

}

export default Client;