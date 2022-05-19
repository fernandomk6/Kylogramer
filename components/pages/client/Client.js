class Client {

  constructor() {
    this.ClientPageTitleAddBtn("client__page-title__add__btn");
    this.ClientInsertFormSubmitBoxCancel("client__insert__form__submit-box__cancel");
    this.ClientInsertForm("client__insert__form");
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

  ClientInsertForm(id) {
    let el = document.getElementById(id);

    let clientInsertFormErrorBox = el.querySelector("#client__insert__form__error-box");
    let clientName = el.querySelector("#client-name");
    let clientPhone = el.querySelector("#client-phone");
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
          console.log(data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

  }

}

export default Client;