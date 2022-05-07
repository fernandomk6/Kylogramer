<!DOCTYPE html>
<html lang="pt-br">
<?php require("./templates/head.html"); ?>
<body>
  <?php require("./templates/header.html"); ?>
  <main>
    <div class="title">
      <h2>Vendas</h2>
      <button class="btn">
        <span class="material-symbols-outlined">
          add
        </span>
      </button>
    </div>
    <div class="search">
      <form>
        <input type="hidden" name="table" value="venda">
        <input type="hidden" name="operation" value="search">
        <input type="number" name="total" placeholder="Valor total">
        <input type="text" name="produto" placeholder="Nome do produto">
        <input type="date" name="data">
        <input type="text" name="cliente" placeholder="Nome do cliente">
        <button type="submit" class="btn">
          <span class="material-symbols-outlined">
            search
          </span>
        </button>
      </form>
    </div>
    <div class="content">
      <div class="content-table">
        <div class="content-thead">
          <div class="content-tr">
            <div class="content-th">
              <span>Cliente</span>
            </div>
            <div class="content-th">
              <span>Data</span>
            </div>
            <div class="content-th">
              <span>Total R$</span>
            </div>
            <div class="content-th">
              <span>Ações</span>
            </div>
          </div>
        </div>
        <div class="content-tbody">
          <div class="content-tr">
            <div class="content-td">
              <span>Fernando Henrique</span>
            </div>
            <div class="content-td">
              <span>12/12/2010</span>
            </div>
            <div class="content-td">
              <span>99.999,99</span>
            </div>
            <div class="content-td --content-td-actions">
              <button class="btn --btn-icon">
                <span class="material-symbols-outlined">
                  delete
                </span>
              </button>
              <button class="btn --btn-icon">
                <span class="material-symbols-outlined">
                  visibility
                </span>
              </button>
            </div>
          </div>
          <div class="content-tr">
            <div class="content-td">
              <span>Fernando Henrique</span>
            </div>
            <div class="content-td">
              <span>12/12/2010</span>
            </div>
            <div class="content-td">
              <span>99.999,99</span>
            </div>
            <div class="content-td --content-td-actions">
              <button class="btn --btn-icon">
                <span class="material-symbols-outlined">
                  delete
                </span>
              </button>
              <button class="btn --btn-icon">
                <span class="material-symbols-outlined">
                  visibility
                </span>
              </button>
            </div>
          </div>
          <div class="content-tr">
            <div class="content-td">
              <span>Fernando Henrique</span>
            </div>
            <div class="content-td">
              <span>12/12/2010</span>
            </div>
            <div class="content-td">
              <span>99.999,99</span>
            </div>
            <div class="content-td --content-td-actions">
              <button class="btn --btn-icon">
                <span class="material-symbols-outlined">
                  delete
                </span>
              </button>
              <button class="btn --btn-icon">
                <span class="material-symbols-outlined">
                  visibility
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</body>
</html>