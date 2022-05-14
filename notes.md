# Notas
*Sessão onde será feita diversas anotações sobre o projeto*

## Modelo de component Javascript
```javascript
class Client {

  constructor() {
    this.myButton("myButton");
    this.myButton2("myButton2");
  };

  myButton(id) {
    let el = document.getElementById(id);

    el.onclick = function() {
      alert("clicou no botão 1");
    }
  };

  myButton2(id) {
    let el = document.getElementById(id);

    el.onclick = function() {
      alert("clicou no botão 2");
    }
  };

}

export default Client;
```