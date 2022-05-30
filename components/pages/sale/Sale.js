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

  buildCard(sale) {

    let productListStr = "";
    let paymentListStr = "";

    for (const product of sale.products) {
      productListStr += `<div class="sale__content__card__product-box__product">
                            <p class="sale__content__card__product-box__product__name-box">
                              ${product.name}
                            </p>
                            <p class="sale__content__card__product-box__product__quantity-box">
                              <span>${product.kilogram}</span>
                              <span>KG </span>
                            </p>
                            <p class="sale__content__card__product-box__product__price-box">
                              <span>R$ </span>
                              <span>${product.unitary}</span>
                            </p>
                          </div>`;
    }

    for (const payment of sale.payments) {
      paymentListStr += `<div class="sale__content__card__payment-box__payment">
                          <p class="sale__content__card__payment-box__payment__name-box">
                            ${payment.name}
                          </p>
                          <p class="sale__content__card__payment-box__payment__tatal-box">
                            <span>R$ </span>
                            <span>${payment.total}</span>
                          </p>
                        </div>`;
    }

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
                      ${sale.client_name}
                    </p>
                    <p class="sale__content__card__sale-box__phone-box">
                      ${sale.client_phone}
                    </p>
                  </div>
                  <div class="sale__content__card__product-box">
                    ${productListStr}
                  </div>
                  <div class="sale__content__card__payment-box">
                    ${paymentListStr}
                  </div>
                  <div class="sale__content__card__total-box">
                    <p class="sale__content__card__total-box__content">
                      R$ ${sale.total}
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
    let formSale = document.querySelector("#sale__insert__form-sale");
    let formClient = document.querySelector("#sale__insert__form-section__client");
    let formProduct = document.querySelector("#sale__insert__form-section__product");
    let formPayment = document.querySelector("#sale__insert__form-section__payment");

    let btnOpenForm = document.querySelector("#sale__page-title__add__btn");
    let btnCancelForm = document.querySelector("#sale__insert__form-section__submit-box__cancel__btn");
    let btnSubmitForm = document.querySelector("#sale__insert__form-section__submit-box__submit__btn");

    let selectClient = document.querySelector("#sale__insert__form-section__header__box__input__select-client");
    let selectProduct = document.querySelector("#sale__insert__form-section__header__box__input__select-product");
    let selectPayment = document.querySelector("#sale__insert__form-section__header__box__input__select-payment");

    let btnAddProduct = document.querySelector("#sale__insert__form-section__header__box__submit__add-product");
    let btnAddPayment = document.querySelector("#sale__insert__form-section__header__box__submit__add-payment");

    let productList = document.querySelector("#sale__insert__form-section__body__product");
    let paymentList = document.querySelector("#sale__insert__form-section__body__payment");

    let totalSale = document.querySelector("#sale__insert__form-section__total-box__content__text__total-sale");
    
    btnOpenForm.onclick = () => {
      // inserir venda com data e retornar id
      // retornar id da venda inserido, todos os clientes, produtos e pagamentos
      const updateTotalSale = (value) => {
        totalSale.innerHTML = parseFloat(parseFloat(totalSale.innerHTML) + parseFloat(value)).toFixed(2);
        formSale.total.value = parseFloat(totalSale.innerHTML).toFixed(2);
      };

      (async () => {
        const res = await fetch('./server/sale.php?type=insert', {
          method: "GET",
          header: {
            ContentType: "application/json"
          },
        });

        const data = await res.json();

        // setando id da venda
        formSale.id.value = data.sale_id;

        // preencher todos os clientes, produtos e pagamentos disponiveis
        for (const client of data.clients) {
          let op = document.createElement("option");
          op.value = client.id;
          op.innerHTML = client.name;
          selectClient.appendChild(op);
        }

        for (const product of data.products) {
          let op = document.createElement("option");
          op.value = product.id;
          op.innerHTML = product.name;
          selectProduct.appendChild(op);
        }

        for (const payment of data.payments) {
          let op = document.createElement("option");
          op.value = payment.id;
          op.innerHTML = payment.name;
          selectPayment.appendChild(op);
        }

        btnAddProduct.onclick = () => {

    

          formProduct.total.value = parseFloat(formProduct.unitary.value) * parseFloat(formProduct.kilogram.value);
          let productName = selectProduct.options[selectProduct.selectedIndex].text;

          let product = {
            id: selectProduct.value,
            name: productName,
            kilogram: formProduct.kilogram.value,
            unitary: formProduct.unitary.value,
            total: formProduct.total.value
          };

          let productItem = `<li data-id="${product.id}" data-total="${product.total}" data-kilogram="${product.kilogram}" data-unitary="${product.unitary}" class="sale__insert__form-section__body__item">
                              <div class="sale__insert__form-section__body__item__data sale__insert__form-section__body__item__data--big">
                                ${product.name}
                              </div>
                              <div class="sale__insert__form-section__body__item__data">
                                <span>KG </span>
                                <span>${product.kilogram}</span>
                              </div>
                              <div class="sale__insert__form-section__body__item__data">
                                <span>R$ </span>
                                <span>${product.total}</span>
                              </div>
                              <div class="sale__insert__form-section__body__item__data">
                                <span data-id="${product.id}" class="material-symbols-outlined material-symbols-outlined--pointer">
                                  close
                                </span>
                              </div>
                            </li>`;

          productList.innerHTML += productItem;
          updateTotalSale(product.total);

          let btnsRemoveProduct = productList.querySelectorAll(`li[data-id] span[data-id]`);

          for (let btnRemoveProduct of btnsRemoveProduct) {
            btnRemoveProduct.onclick = () => {
              let id = btnRemoveProduct.dataset.id;
              let productItem = productList.querySelector(`li[data-id="${id}"]`);
              updateTotalSale(parseFloat(productItem.dataset.total) - parseFloat(productItem.dataset.total) - parseFloat(productItem.dataset.total));
              productItem.remove();
            }; 
          }

        };

        btnAddPayment.onclick = () => {

          let paymentName = selectPayment.options[selectPayment.selectedIndex].text;
          
          let payment = {
            id: selectPayment.value,
            name: paymentName,
            total: formPayment.total.value
          };

          let paymentItem = `<li data-id="${payment.id}" data-name="payment" data-total="${payment.total}" class="sale__insert__form-section__body__item">
                              <div class="sale__insert__form-section__body__item__data sale__insert__form-section__body__item__data--big">
                                ${payment.name}
                              </div>
                              <div class="sale__insert__form-section__body__item__data">
                                <span>R$ </span>
                                <span>${payment.total}</span>
                              </div>
                              <div class="sale__insert__form-section__body__item__data">
                                <span data-id="${payment.id}" class="material-symbols-outlined material-symbols-outlined--pointer">
                                  close
                                </span>
                              </div>
                            </li>`;

          paymentList.innerHTML += paymentItem;

          let btnsRemovePayment = paymentList.querySelectorAll(`li[data-id] span[data-id]`);

          for (let btnRemovePayment of btnsRemovePayment) {
            btnRemovePayment.onclick = () => {
              let id = btnRemovePayment.dataset.id;
              let paymentItem = paymentList.querySelector(`li[data-id="${id}"]`);
              paymentItem.remove();
            }; 
          }
        };

        this.showForm();
      })();

    };

    btnCancelForm.onclick = () => {
      this.clearFormData();
      this.showCards();
    };

    btnSubmitForm.onclick = () => {

      if (this.validation()) {
        // criar dados para inserção

        let formData = new FormData;
        formData.append("type", "insert");
        formData.append("sale_id", formSale.id.value);
        formData.append("client_id", formClient.id.value);
        formData.append("date", formClient.date.value);
        formData.append("total", formSale.total.value);

        for (let product of productList.querySelectorAll("li")) {
          let p = {};
          p.id = product.dataset.id;
          p.kilogram = product.dataset.kilogram;
          p.unitary = product.dataset.unitary;
          p.total = product.dataset.total;
          formData.append("products[]", `${p.id}, ${p.kilogram}, ${p.unitary}, ${p.total}`);
        }

        for (let payment of paymentList.querySelectorAll("li")) {
          let p = {};
          p.id = payment.dataset.id;
          p.total = payment.dataset.total;
          formData.append("payments[]", `${p.id}, ${p.total}`);
        }

        // limpar dados do form
        this.clearFormData();

        // enviar requisição para inserir a venda
        (async () => {
          await fetch('./server/sale.php', {
            method: "POST",
            header: {
              ContentType: "application/json"
            },
            body: formData
          });

          // atualizar todos os cards
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
    let formSale = document.querySelector("#sale__insert__form-sale");
    let formProduct = document.querySelector("#sale__insert__form-section__product");
    let formPayment = document.querySelector("#sale__insert__form-section__payment");

    // limpando as listas
    let productList = document.querySelector("#sale__insert__form-section__body__product");
    let paymentList = document.querySelector("#sale__insert__form-section__body__payment");
    productList.innerHTML = "";
    paymentList.innerHTML = "";

    // limpando selects
    let selectClient = document.querySelector("#sale__insert__form-section__header__box__input__select-client");
    let selectProduct = document.querySelector("#sale__insert__form-section__header__box__input__select-product");
    let selectPayment = document.querySelector("#sale__insert__form-section__header__box__input__select-payment");
    selectClient.innerHTML = "";
    selectProduct.innerHTML = "";
    selectPayment.innerHTML = "";

    let totalSale = document.querySelector("#sale__insert__form-section__total-box__content__text__total-sale");
    totalSale.innerHTML = "0,00";

    formSale.id.value = "";
    formSale.total.value = "";

    formProduct.kilogram.value = "";
    formProduct.unitary.value = "";
    formProduct.total.value = "";

    formPayment.total.value = "";

    document.querySelector("#sale__insert__form-section__error-box").innerHTML = "";
  };

  validation() {
    let formSale = document.querySelector("#sale__insert__form-sale");
    let formClient = document.querySelector("#sale__insert__form-section__client");

    // listas
    let productList = document.querySelector("#sale__insert__form-section__body__product");
    let paymentList = document.querySelector("#sale__insert__form-section__body__payment");

    // total string
    let totalSale = document.querySelector("#sale__insert__form-section__total-box__content__text__total-sale");

    // box de erro
    let errorsSection = document.querySelector("#sale__insert__form-section__error-box");

    errorsSection.innerHTML = "";
    let errors = [];

    if (formClient.date.value == "") {
      errors.push("Data em branco");
    }

    if (!formClient.id.value) {
      errors.push("Cliente em branco");
    }

    if (productList.innerText == "") {
      errors.push("Nenhum produto adicionado");
    }

    if (paymentList.innerText == "") {
      errors.push("Nenhuma forma de pagamento adicionada");
    }

    if (!parseFloat(totalSale.innerText)) {
      errors.push("Total invalido");
    }

    if (errors.length !== 0) {
      for (const error of errors) {

        let span = document.createElement("span");
        span.classList.add("sale__insert__form-section__error-box__error");
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

      const data = await res.json();
      
      // limpando todos os cards
      this.sections.content.innerHTML = "";

      // iterando as vendas e buildando o card
      for (const sale of data) {
        let card = this.buildCard(sale);

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
          const sale = data[0];
          // dados da venda a serem editados

          // pegando os formularios e preenchendo com os dados do cliente que foi clicado em editar
          let formSale = document.querySelector("#sale__insert__form-sale");
          let formClient = document.querySelector("#sale__insert__form-section__client");
          let formProduct = document.querySelector("#sale__insert__form-section__product");
          let formPayment = document.querySelector("#sale__insert__form-section__payment");

          let selectClient = document.querySelector("#sale__insert__form-section__header__box__input__select-client");
          let selectProduct = document.querySelector("#sale__insert__form-section__header__box__input__select-product");
          let selectPayment = document.querySelector("#sale__insert__form-section__header__box__input__select-payment");
                
          let productList = document.querySelector("#sale__insert__form-section__body__product");
          let paymentList = document.querySelector("#sale__insert__form-section__body__payment");

          let totalSale = document.querySelector("#sale__insert__form-section__total-box__content__text__total-sale");

          const updateTotalSale = (value) => {
            totalSale.innerHTML = parseFloat(parseFloat(totalSale.innerHTML) + parseFloat(value)).toFixed(2);
            formSale.total.value = parseFloat(totalSale.innerHTML).toFixed(2);
          };

          // pegando todos os produtos e todos os dados
          const resAll = await fetch('./server/sale.php?type=update', {
            method: "GET",
            header: {
              ContentType: "application/json"
            },
          });
  
          const dataAll = await resAll.json();
  
          // preencher todos os clientes, produtos e pagamentos disponiveis
          for (const client of dataAll.clients) {
            let op = document.createElement("option");
            if (client.id == sale.client_id) {
              op.setAttribute("selected", true);
            }
            op.value = client.id;
            op.innerHTML = client.name;
            selectClient.appendChild(op);
          }
  
          for (const product of dataAll.products) {
            let op = document.createElement("option");
            op.value = product.id;
            op.innerHTML = product.name;
            selectProduct.appendChild(op);
          }
  
          for (const payment of dataAll.payments) {
            let op = document.createElement("option");
            op.value = payment.id;
            op.innerHTML = payment.name;
            selectPayment.appendChild(op);
          }
      

          formSale.id.value = sale.id;
          formSale.total.value = sale.total;
      
          // inserir cliente no select
          formClient.date.value = sale.date;
          totalSale.innerHTML = sale.total;

          // inserir produtos na ul
          for (const product of sale.products) {
              
            let productItem = `<li data-id="${product.product_id}" data-total="${product.total}" data-kilogram="${product.kilogram}" data-unitary="${product.unitary}" class="sale__insert__form-section__body__item">
                                <div class="sale__insert__form-section__body__item__data sale__insert__form-section__body__item__data--big">
                                  ${product.name}
                                </div>
                                <div class="sale__insert__form-section__body__item__data">
                                  <span>KG </span>
                                  <span>${product.kilogram}</span>
                                </div>
                                <div class="sale__insert__form-section__body__item__data">
                                  <span>R$ </span>
                                  <span>${product.total}</span>
                                </div>
                                <div class="sale__insert__form-section__body__item__data">
                                  <span data-id="${product.product_id}" class="material-symbols-outlined material-symbols-outlined--pointer">
                                    close
                                  </span>
                                </div>
                              </li>`;

            productList.innerHTML += productItem;  

            let btnsRemoveProduct = productList.querySelectorAll(`li[data-id] span[data-id]`);

            for (let btnRemoveProduct of btnsRemoveProduct) {
              btnRemoveProduct.onclick = () => {
                let id = btnRemoveProduct.dataset.id;
                let productItem = productList.querySelector(`li[data-id="${id}"]`);
                updateTotalSale(parseFloat(productItem.dataset.total) - parseFloat(productItem.dataset.total) - parseFloat(productItem.dataset.total));
                productItem.remove();
              }; 
            }
          }         

          // inserir pagamento na ul
          for (const payment of sale.payments) {            
            let paymentItem = `<li data-id="${payment.payment_id}" data-name="payment" data-total="${payment.total}" class="sale__insert__form-section__body__item">
                                <div class="sale__insert__form-section__body__item__data sale__insert__form-section__body__item__data--big">
                                  ${payment.name}
                                </div>
                                <div class="sale__insert__form-section__body__item__data">
                                  <span>R$ </span>
                                  <span>${payment.total}</span>
                                </div>  
                                <div class="sale__insert__form-section__body__item__data">
                                  <span data-id="${payment.payment_id}" class="material-symbols-outlined material-symbols-outlined--pointer">
                                    close
                                  </span>
                                </div>
                              </li>`;

            paymentList.innerHTML += paymentItem;

            let btnsRemovePayment = paymentList.querySelectorAll(`li[data-id] span[data-id]`);

            for (let btnRemovePayment of btnsRemovePayment) {
              btnRemovePayment.onclick = () => {
                let id = btnRemovePayment.dataset.id;
                let paymentItem = paymentList.querySelector(`li[data-id="${id}"]`);
                paymentItem.remove();
              }; 
            }
          }

                
          let btnAddProduct = document.querySelector("#sale__insert__form-section__header__box__submit__add-product");
          let btnAddPayment = document.querySelector("#sale__insert__form-section__header__box__submit__add-payment");

          btnAddProduct.onclick = () => {

      
  
            formProduct.total.value = parseFloat(formProduct.unitary.value) * parseFloat(formProduct.kilogram.value);
            let productName = selectProduct.options[selectProduct.selectedIndex].text;
  
            let product = {
              id: selectProduct.value,
              name: productName,
              kilogram: formProduct.kilogram.value,
              unitary: formProduct.unitary.value,
              total: formProduct.total.value
            };
  
            let productItem = `<li data-id="${product.id}" data-total="${product.total}" data-kilogram="${product.kilogram}" data-unitary="${product.unitary}" class="sale__insert__form-section__body__item">
                                <div class="sale__insert__form-section__body__item__data sale__insert__form-section__body__item__data--big">
                                  ${product.name}
                                </div>
                                <div class="sale__insert__form-section__body__item__data">
                                  <span>KG </span>
                                  <span>${product.kilogram}</span>
                                </div>
                                <div class="sale__insert__form-section__body__item__data">
                                  <span>R$ </span>
                                  <span>${product.total}</span>
                                </div>
                                <div class="sale__insert__form-section__body__item__data">
                                  <span data-id="${product.id}" class="material-symbols-outlined material-symbols-outlined--pointer">
                                    close
                                  </span>
                                </div>
                              </li>`;
  
            productList.innerHTML += productItem;
            updateTotalSale(product.total);
  
            let btnsRemoveProduct = productList.querySelectorAll(`li[data-id] span[data-id]`);
  
            for (let btnRemoveProduct of btnsRemoveProduct) {
              btnRemoveProduct.onclick = () => {
                let id = btnRemoveProduct.dataset.id;
                let productItem = productList.querySelector(`li[data-id="${id}"]`);
                updateTotalSale(parseFloat(productItem.dataset.total) - parseFloat(productItem.dataset.total) - parseFloat(productItem.dataset.total));
                productItem.remove();
              }; 
            }
  
          };
  
          btnAddPayment.onclick = () => {
  
            let paymentName = selectPayment.options[selectPayment.selectedIndex].text;
            
            let payment = {
              id: selectPayment.value,
              name: paymentName,
              total: formPayment.total.value
            };
  
            let paymentItem = `<li data-id="${payment.id}" data-name="payment" data-total="${payment.total}" class="sale__insert__form-section__body__item">
                                <div class="sale__insert__form-section__body__item__data sale__insert__form-section__body__item__data--big">
                                  ${payment.name}
                                </div>
                                <div class="sale__insert__form-section__body__item__data">
                                  <span>R$ </span>
                                  <span>${payment.total}</span>
                                </div>
                                <div class="sale__insert__form-section__body__item__data">
                                  <span data-id="${payment.id}" class="material-symbols-outlined material-symbols-outlined--pointer">
                                    close
                                  </span>
                                </div>
                              </li>`;
  
            paymentList.innerHTML += paymentItem;
  
            let btnsRemovePayment = paymentList.querySelectorAll(`li[data-id] span[data-id]`);
  
            for (let btnRemovePayment of btnsRemovePayment) {
              btnRemovePayment.onclick = () => {
                let id = btnRemovePayment.dataset.id;
                let paymentItem = paymentList.querySelector(`li[data-id="${id}"]`);
                paymentItem.remove();
              }; 
            }
          };

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

        const res = await fetch(`./server/sale.php?type=search&id=${e.target.id.value}&name=${e.target.name.value}`, {
          method: "GET",
          headers: {
            contentType: "application/json"
          }
        });
  
        const data = await res.json();
        console.log(data)
        this.sections.content.innerHTML = "";
        
        // buildando cada card
        for (const sale of data) {
          let card = this.buildCard(sale);
  
          // inserindo o card dentro do container dos cards
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