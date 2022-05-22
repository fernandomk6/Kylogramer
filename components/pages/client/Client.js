class Client {

  constructor() {
    this.form();
  };

  sections = {
    pageTitle: document.getElementById("client__page-title__section"),
    search: document.getElementById("client__search__section"),
    content: document.getElementById("client__content__section"),
    insert: document.getElementById("client__insert__section")
  };

  form() {
    this.openForm();
    this.cancelForm();
    this.submitForm();
  };

  openForm() {
    let openBtn = document.getElementById("client__page-title__add__btn");
  
    openBtn.onclick = () => {
      this.hideAllSections();
      this.sections.insert.classList.remove("--hide");
    };

  };

  cancelForm() {
    let cancelBtn = document.getElementById("client__insert__form__submit-box__cancel__btn");
    cancelBtn.onclick = () => {
      this.clearFormData();
      this.showAllSections();
      this.sections.insert.classList.add("--hide");
    };
  };

  submitForm() {
    let form = document.getElementById("client__insert__form__form");
    form.onsubmit = (e) => {
      e.preventDefault();

      if (this.validation()) {
        let formData = new FormData(form);
        formData.append("type", "insert");
        this.clearFormData();

        (async () => {
          await fetch('./server/client.php', {
            method: "POST",
            header: {
              ContentType: "application/json"
            },
            body: formData
          });

          this.loadCards();

        })();
        
      }
    }
  };

  clearFormData() {
    document.getElementById("client__insert__form__input-box__input__name").value = "";
    document.getElementById("client__insert__form__input-box__input__phone").value = "";
    document.getElementById("client__insert__form__error-box__section").innerHTML = "";
  };

  validation() {
    let name = document.getElementById("client__insert__form__input-box__input__name").value;
    let phone = document.getElementById("client__insert__form__input-box__input__phone").value;
    let errorsSection = document.getElementById("client__insert__form__error-box__section");
    let errors = [];
    errorsSection.innerHTML = "";

    if (!name) {
      errors.push("Nome inválido");
    }

    if (!phone) {
      errors.push("Phone inválido");
    }

    if (errors.length !== 0) {
      for (const error of errors) {
        let span = document.createElement("span");
        span.classList.add("client__insert__form__error-box__error");
        span.innerHTML = error;
        errorsSection.appendChild(span);
      }
      return;
    }

    return true;

  };

  hideAllSections() {
    for (const section in this.sections) {
      if (Object.hasOwnProperty.call(this.sections, section)) {
        this.sections[section].classList.add("--hide");
      }
    }
  };

  showAllSections() {
    for (const section in this.sections) {
      if (Object.hasOwnProperty.call(this.sections, section)) {
        this.sections[section].classList.remove("--hide");
      }
    }
  };

  delete() {

  };

  update() {

  };

  loadCards() {
    console.log("Load all card");
  }

  selectById() {

  };

  search() {

  };

}

export default Client;