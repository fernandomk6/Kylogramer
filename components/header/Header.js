class Header {

  constructor() {
    this.HeaderNavItemClient("Header__nav__item__client");
    this.HeaderNavItemProduct("Header__nav__item__product");
    this.HeaderNavItemSale("Header__nav__item__sale");
    this.HeaderNavItemPayment("Header__nav__item__payment");
  };

  HeaderNavItemClient(id) {
    let el = document.getElementById(id);

    let pages = [
      document.getElementById("client"),
      document.getElementById("product"),
      document.getElementById("sale"),
      document.getElementById("payment")
    ];

    el.onclick = function() {
      
      for (const page of pages) {
        page.classList.add("--hide");
      }

      document.getElementById("client").classList.remove("--hide");

    }

  };

  HeaderNavItemProduct(id) {
    let el = document.getElementById(id);

    let pages = [
      document.getElementById("client"),
      document.getElementById("product"),
      document.getElementById("sale"),
      document.getElementById("payment")
    ];

    el.onclick = function() {
      
      for (const page of pages) {
        page.classList.add("--hide");
      }

      document.getElementById("product").classList.remove("--hide");

    }
  };

  HeaderNavItemSale(id) {
    let el = document.getElementById(id);

    let pages = [
      document.getElementById("client"),
      document.getElementById("product"),
      document.getElementById("sale"),
      document.getElementById("payment")
    ];

    el.onclick = function() {
      
      for (const page of pages) {
        page.classList.add("--hide");
      }

      document.getElementById("sale").classList.remove("--hide");

    }
  };

  HeaderNavItemPayment(id) {
    let el = document.getElementById(id);

    let pages = [
      document.getElementById("client"),
      document.getElementById("product"),
      document.getElementById("sale"),
      document.getElementById("payment")
    ];

    el.onclick = function() {
      
      for (const page of pages) {
        page.classList.add("--hide");
      }

      document.getElementById("payment").classList.remove("--hide");

    }
  };

}

export default Header;