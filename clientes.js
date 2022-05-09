function showModalAdd() {
  let btnAddClient = document.querySelector("#btn-add-client");

  if(!btnAddClient) {
    return;
  }
  
  btnAddClient.addEventListener("click", function() {
    alert("clicou");
  });

}

window.addEventListener("load", showModalAdd);