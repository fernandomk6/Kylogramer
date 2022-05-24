class Product {

  constructor() {
    this.loadCards();
    this.form();
    this.search();
  };

  sections = {
    pageTitle: document.querySelector("#product__page-title__section"),
    search: document.querySelector("#product__search__section"),
    content: document.querySelector("#product__content__section"),
    insert: document.querySelector("#product__insert__section"),
    dialogMessage: document.querySelector("#product__dialog-message__section")
  };

  buildCard(id, name, price) {
    let card = `<div class="product__content__card">
                  <div class="product__content__card__id-box">
                    <span class="product__content__card__id-box__title">Id</span>
                    <p class="product__content__card__id-box__content">${id}</p>
                  </div>
                  <div class="product__content__card__name-box">
                    <span class="product__content__card__name-box__title">Nome</span>
                    <p class="product__content__card__name-box__content">${name}</p>
                  </div>
                  <div class="product__content__card__price-box">
                    <span class="product__content__card__price-box__title">Preço KG</span>
                    <p class="product__content__card__price-box__content">
                      <span>R$ </span>
                      <span>${price}</span>
                    </p>
                  </div>
                  <div class="product__content__card__actions-box">
                    <form data-id="product__content__card__actions-box__update-form">
                      <input type="hidden" name="type" value="update">
                      <input type="hidden" name="id" value="${id}">
                      <button class="product__content__card__actions-box__action" type="submit">Editar</button>
                    </form>
                    <form data-id="product__content__card__actions-box__delete-form">
                      <input type="hidden" name="type" value="delete">
                      <input type="hidden" name="id" value="${id}">
                      <button class="product__content__card__actions-box__action" type="submit">Excluir</button>
                    </form>
                  </div>
                </div>`;
    return card;
  };

  form() {
    let form = document.querySelector("#product__insert__form__form");
    let btnOpenForm = document.querySelector("#product__page-title__add__btn");
    let btnCancelForm = document.querySelector("#product__insert__form__submit-box__cancel__btn");

    btnOpenForm.onclick = () => {
      this.showForm();
    };

    btnCancelForm.onclick = () => {
      this.clearFormData();
      this.showCards();
    };

    form.onsubmit = (e) => {
      e.preventDefault();

      if (this.validation()) {
        let formData = new FormData(form);
        formData.append("type", "insert");
        this.clearFormData();

        (async () => {
          await fetch('./server/product.php', {
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

  showForm() {
    this.sections.pageTitle.classList.add("--hide");
    this.sections.search.classList.add("--hide");
    this.sections.content.classList.add("--hide");
    this.sections.dialogMessage.classList.add("--hide");
    this.sections.insert.classList.remove("--hide");
  };

  showCards() {
    this.sections.pageTitle.classList.remove("--hide");
    this.sections.search.classList.remove("--hide");
    this.sections.content.classList.remove("--hide");
    this.sections.insert.classList.add("--hide");
    this.sections.dialogMessage.classList.add("--hide");
  };

  showDialogMessage(action, message) {

    let btnYes = document.querySelector("#product__dialog-message__action-box__action__yes");
    let btnNo = document.querySelector("#product__dialog-message__action-box__action__no");
    let textBox = document.querySelector("#product__dialog-message__content__text-box");
    textBox.innerHTML = "";
    let span = document.createElement("span");
    span.classList.add("product__dialog-message__content__message");
    span.innerHTML = message;
    textBox.appendChild(span);

    btnNo.onclick = () => {
      this.loadCards();
    };

    btnYes.onclick = () => {
      action();
    };

    this.sections.pageTitle.classList.add("--hide");
    this.sections.search.classList.add("--hide");
    this.sections.content.classList.add("--hide");
    this.sections.insert.classList.add("--hide");
    this.sections.dialogMessage.classList.remove("--hide");
  };

  clearFormData() {
    document.querySelector("#product__insert__form__input-box__input__id").value = "0";
    document.querySelector("#product__insert__form__input-box__input__name").value = "";
    document.querySelector("#product__insert__form__input-box__input__price").value = "";
    document.querySelector("#product__insert__form__error-box__section").innerHTML = "";
  };

  validation() {
    let name = document.querySelector("#product__insert__form__input-box__input__name").value;
    let price = document.querySelector("#product__insert__form__input-box__input__price").value;
    let errorsSection = document.querySelector("#product__insert__form__error-box__section");

    errorsSection.innerHTML = "";
    let errors = [];

    if (!name) {
      errors.push("Nome em branco");
    }

    if (!price) {
      errors.push("Preço em branco");
    }

    if (errors.length !== 0) {
      for (const error of errors) {

        let span = document.createElement("span");
        span.classList.add("product__insert__form__error-box__error");
        span.innerHTML = error;

        errorsSection.appendChild(span);
      }
      return;
    }

    return true;

  };

  loadCards() {
    (async () => {

      const res = await fetch("./server/product.php?type=selectAll", {
        method: "GET",
        headers: {
          contentType: "application/json"
        }
      });
      const data = await res.json();

      this.sections.content.innerHTML = "";

      for (const product of data) {

        product.price = parseFloat(product.price).toLocaleString('pt-br', {minimumFractionDigits: 2});

        let card = this.buildCard(product.id, product.name, product.price);
        this.sections.content.innerHTML += card;
      }

      this.delete();
      this.update();
      this.showCards();

    })();
  };

  delete() {
    let formsOfDelete = document.querySelectorAll("form[data-id=product__content__card__actions-box__delete-form]");

    for (let form of formsOfDelete) {

      form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const action = async () => {
          await fetch("./server/product.php", {
            method: "POST",
            header: {
              contentType: "application/json"
            },
            body: formData
          });

          
          this.loadCards();
        };

        const message = "Deseja realmente excluir o Produto?";
        this.showDialogMessage(action, message);

      };
    };

  };

  update() {
    let formsOfUpdate = document.querySelectorAll("form[data-id=product__content__card__actions-box__update-form]");

    for (let form of formsOfUpdate) {

      form.onsubmit = (e) => {
        e.preventDefault();

        (async () => {
          const res = await fetch(`./server/product.php?type=selectById&id=${e.target.id.value}`, {
            method: "GET",
            header: {
              contentType: "application/json"
            }
          });

          const data = await res.json();

          let form = document.querySelector("#product__insert__form__form");
          form.name.value = data.name;
          form.price.value = data.price;
          form.id.value = data.id;

          this.showForm();

        })();

      };
    };
  };

  search() {

    let form = document.querySelector("#product__search__form__form");

    form.onsubmit = (e) => {
      e.preventDefault();

      (async () => {

        const res = await fetch(`./server/product.php?type=search&id=${e.target.id.value}&name=${e.target.name.value}&price=${e.target.price.value}`, {
          method: "GET",
          headers: {
            contentType: "application/json"
          }
        });
  
        const data = await res.json();

        this.sections.content.innerHTML = "";
        
        for (const product of data) {

          product.price = parseFloat(product.price).toLocaleString('pt-br', {minimumFractionDigits: 2});
          
          let card = this.buildCard(product.id, product.name, product.price);
          this.sections.content.innerHTML += card;
        }
  
        this.delete();
        this.update();
        this.showCards();
  
      })();
    };
  };

}

export default Product;