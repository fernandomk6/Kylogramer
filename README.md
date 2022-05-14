# Kylogramer

Projeto piloto para um sistema para empresas de reciclagem.

## A principio o sistema deve conter os registros de 
- clientes
- vendas
- produtos  
  *preço em kg*

## Emissão de recibos de venda
- modelo padrão

## Alguns relatorios de vendas
- por periodo
- por cliente

## component/pages/page/page.js
    ```
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
## index.js

    ````
    import Client from "./components/pages/client/Client.js";

    const client = new Client();

    console.log(client);
    ```

