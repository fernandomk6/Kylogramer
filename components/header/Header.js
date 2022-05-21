class Header {

  constructor() {
    this.showClientPage();
    this.showProductPage();
    this.showSalePage();
    this.showPaymentPage();
  };

  pages = {
    client: document.getElementById("client"),
    product: document.getElementById("product"),
    sale: document.getElementById("sale"),
    payment: document.getElementById("payment")
  };

  hideAllPages() {
    for (const page in this.pages) {
      if (Object.hasOwnProperty.call(this.pages, page)) {
        const element = this.pages[page];
        element.classList.add("--hide");
      }
    }
  }

  showClientPage() {

    let headerNavItemClient = document.getElementById("Header__nav__item__client");

    headerNavItemClient.onclick = () => {
      this.hideAllPages();
      this.pages.client.classList.remove("--hide");
    };

  };

  showProductPage() {
    
    let headerNavItemProduct = document.getElementById("Header__nav__item__product");

    headerNavItemProduct.onclick = () => {
      this.hideAllPages();
      this.pages.product.classList.remove("--hide");
    }

  };

  showSalePage() {
    
    let headerNavItemSale = document.getElementById("Header__nav__item__sale");

    headerNavItemSale.onclick = () => {
      this.hideAllPages();
      this.pages.sale.classList.remove("--hide");
    }

  };

  showPaymentPage() {
    
    let headerNavItemPayment = document.getElementById("Header__nav__item__payment");

    headerNavItemPayment.onclick = () => {
      this.hideAllPages();
      this.pages.payment.classList.remove("--hide");
    }

  };

}

export default Header;