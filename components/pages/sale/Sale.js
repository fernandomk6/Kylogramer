class Sale {
 
  constructor() {
    this.loadCards();
    this.form();
    this.search();
  };

  sections = {
    pageTitle: document.querySelector("#sale__page-title__section"),
    search: document.querySelector("#sale__search__section"),
    content: document.querySelector("#sale__content__section"),
    insert: document.querySelector("#sale__insert__section"),
    dialogMessage: document.querySelector("#sale__dialog-message__section")
  };

  buildCard(sale, clients, payments) {
    let card = `<div class="sale__content__card">
                  <div class="sale__content__card__sale-box">
                    <div class="sale__content__card__sale-box__id-box">
                      <span class="sale__content__card__sale-box__id-box__title">Id</span>
                      <p class="sale__content__card__sale-box__id-box__content">${sale.id}</p>
                    </div>
                    <div class="sale__content__card__sale-box__date-box">
                      <span class="sale__content__card__sale-box__date-box__title">Data</span>
                      <p class="sale__content__card__sale-box__date-box__content">${sale.date}</p>
                    </div>
                  </div>
                  <div class="sale__content__card__sale-box">
                    <p class="sale__content__card__sale-box__name-box">
                      ${clients.client.name}
                    </p>
                    <p class="sale__content__card__sale-box__phone-box">
                      ${clients.client.phone}
                    </p>
                  </div>
                  <div class="sale__content__card__product-box">
                    <div class="sale__content__card__product-box__product">
                      <p class="sale__content__card__product-box__product__name-box">
                        ${products.product.name}
                      </p>
                      <p class="sale__content__card__product-box__product__quantity-box">
                        <span>${products.product.quantity}</span>
                        <span>KG </span>
                      </p>
                      <p class="sale__content__card__product-box__product__price-box">
                        <span>R$ </span>
                        <span>${products.product.price}</span>
                      </p>
                    </div>
                  </div>
                  <div class="sale__content__card__payment-box">
                    <div class="sale__content__card__payment-box__payment">
                      <p class="sale__content__card__payment-box__payment__name-box">
                        ${payments.payment.name}
                      </p>
                      <p class="sale__content__card__payment-box__payment__tatal-box">
                        <span>R$ </span>
                        <span>${payments.payment.total}</span>
                      </p>
                    </div>
                  </div>
                  <div class="sale__content__card__total-box">
                    <p class="sale__content__card__total-box__content">
                      ${sale.total}
                    </p>
                  </div>
                  <div class="sale__content__card__actions-box">
                    <form data-id="sale__content__card__actions-box__update-form">
                      <input type="hidden" name="type" value="update">
                      <input type="hidden" name="id" value="${sale.id}">
                      <button class="sale__content__card__actions-box__action" type="submit">Editar</button>
                    </form>
                    <form data-id="sale__content__card__actions-box__delete-form">
                      <input type="hidden" name="type" value="delete">
                      <input type="hidden" name="id" value="${sale.id}">
                      <button class="sale__content__card__actions-box__action" type="submit">Excluir</button>
                    </form>
                  </div>
                </div>`;
    return card;
  };

  form() {
    let formSale = document.querySelector("#sale__insert__fomr-sale");
    let formClient = document.querySelector("#sale__insert__form-section__client");
    let formProduct = document.querySelector("#sale__insert__form-section__product");
    let formPayment = document.querySelector("#sale__insert__form-section__payment");
    
    let btnOpenForm = document.querySelector("#sale__page-title__add__btn");
    let btnCancelForm = document.querySelector("#sale__insert__form-section__submit-box__cancel__btn");

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
          await fetch('./server/sale.php', {
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

    let btnYes = document.querySelector("#sale__dialog-message__action-box__action__yes");
    let btnNo = document.querySelector("#sale__dialog-message__action-box__action__no");
    let textBox = document.querySelector("#sale__dialog-message__content__text-box");
    textBox.innerHTML = "";
    let span = document.createElement("span");
    span.classList.add("sale__dialog-message__content__message");
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
    let formSale = document.querySelector("#sale__insert__fomr-sale");
    let formClient = document.querySelector("#sale__insert__form-section__client");
    let formProduct = document.querySelector("#sale__insert__form-section__product");
    let formPayment = document.querySelector("#sale__insert__form-section__payment");
    let formProductBody = document.querySelector("#sale__insert__form-section__body__product");
    let formPaymentBody = document.querySelector("#sale__insert__form-section__body__payment");

    formSale.id = "";
    formSale.date = "";
    formSale.total = "";
    formSale.client_id = "";

    formClient.name = ""; // campo usado para fazer a busca pelo id do cliente pelo nome
    formClient.date = ""; // depois jogar esse valor para o formSale.total

    formProduct.id = "";
    formProduct.name = ""; // campo usado para fazer a busca
    formProduct.kilogram = "";
    formProduct.unitary = "";
    formProduct.total = "";
    formProductBody.innerHTML = ""; 

    formPayment.id = "";
    formPayment.name = ""; // campo usado para fazer a pesquisa
    formPayment.total = "";
    formPaymentBody.innerHTML = "";

    document.querySelector("#sale__insert__form__error-box__section").innerHTML = "";
  };

  validation() {
    let form = document.querySelector("#sale__insert__form__form");
    let name = form.name.value;
    let phone = form.phone.value;
    let errorsSection = document.querySelector("#sale__insert__form__error-box__section");

    errorsSection.innerHTML = "";
    let errors = [];

    if (!name) {
      errors.push("Nome em branco");
    }

    if (!phone) {
      errors.push("Telefone em branco");
    }

    if (errors.length !== 0) {
      for (const error of errors) {

        let span = document.createElement("span");
        span.classList.add("sale__insert__form__error-box__error");
        span.innerHTML = error;

        errorsSection.appendChild(span);
      }
      return;
    }

    return true;

  };

  loadCards() {
    (async () => {
      const res = await fetch("./server/sale.php?type=selectAll", {
        method: "GET",
        headers: {
          contentType: "application/json"
        }
      });

      // data com todas as vendas
      const data = await res.json();
      console.log("aqui", data);

      // limpando todos os cards
      this.sections.content.innerHTML = "";

      // iterando as vendas e buildando o card
      for (const client of data) {
        let card = this.buildCard(client.id, client.name, client.phone);

        // inserindo o card dentro do container dos cards
        this.sections.content.innerHTML += card;
      }

      this.delete();
      this.update();
      this.showCards();

    })();
  };

  delete() {
    let formsOfDelete = document.querySelectorAll("form[data-id=sale__content__card__actions-box__delete-form]");

    for (let form of formsOfDelete) {

      form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const action = async () => {
          await fetch("./server/sale.php", {
            method: "POST",
            header: {
              contentType: "application/json"
            },
            body: formData
          });

          
          this.loadCards();
        };

        const message = "Deseja realmente excluir a venda?";
        this.showDialogMessage(action, message);

      };
    };

  };

  update() {
    // botao que clica e vai abir a tela de editar
    let formsOfUpdate = document.querySelectorAll("form[data-id=sale__content__card__actions-box__update-form]");

    // setando o evento em cada botao de editar
    for (let form of formsOfUpdate) {

      // quando clicar em editar, vai fazer isso
      form.onsubmit = (e) => {
        e.preventDefault();

        // pego os dados da venda que foi clicado para editar
        (async () => {
          const res = await fetch(`./server/sale.php?type=selectById&id=${e.target.id.value}`, {
            method: "GET",
            header: {
              contentType: "application/json"
            }
          });

          const data = await res.json();
          // um array, com 2 array dentro, os 2 arrays de dentro sao objeto
          // [ products -> [{product 1}, {product 2}], payments -> [{payment 1}, {payment 2}] ]

          // desestrututando os dados da venda
          const sale = {
            id: data[0].sale__id,
            clientId: date[0].sale__client_id,
            clientName: date[0].sale__client_name,
            date: data[0].sale__date,
            total: data[0].sale__total
          };

          const products = data[0];
          const payments = data[1];

          // pegando os formularios e preenchendo com os dados do cliente que foi clicado em editar
          let formSale = document.querySelector("#sale__insert__fomr-sale");
          let formClient = document.querySelector("#sale__insert__form-section__client");
          let formProduct = document.querySelector("#sale__insert__form-section__product");
          let formPayment = document.querySelector("#sale__insert__form-section__payment");
      
          formSale.id = sale.id;
          formSale.date = sale.date;
          formSale.total = sale.total;
          formSale.client_id = sale.clientId;
      
          formClient.name = sale.clientName;
          formClient.date = sale.date;
      
          formProduct.id = products.product__id;
          formProduct.name = products.product__name;
          formProduct.kilogram = products.product__kilogram;
          formProduct.unitary = products.product__unitary;
          formProduct.total = products.product__total;

          formPayment.id = payments.payment__id;
          formPayment.name = payments.payment__name;
          formPayment.total = payments.payment__total;

          this.showForm();
        })();

      };
    };
  };

  search() {

    let form = document.querySelector("#sale__search__form__form");

    form.onsubmit = (e) => {
      e.preventDefault();

      (async () => {

        const res = await fetch(`./server/sale.php?type=search&id=${e.target.id.value}&name=${e.target.name.value}&phone=${e.target.phone.value}`, {
          method: "GET",
          headers: {
            contentType: "application/json"
          }
        });
  
        const data = await res.json();
        
        this.sections.content.innerHTML = "";
        
        for (const client of data) {
          let card = this.buildCard(client.id, client.name, client.phone);
          this.sections.content.innerHTML += card;
        }
  
        this.delete();
        this.update();
        this.showCards();
  
      })();
    };
  };

}

export default Sale;