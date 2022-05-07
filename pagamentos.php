<!DOCTYPE html>
<html lang="pt-br">
<?php require("./templates/head.html"); ?>
<body>
  <?php require("./templates/header.html"); ?>
  <main>
    <div class="main-action">
      <button id="btn-add" class="btn">
        <span>Adicionar</span>
        <span class="material-symbols-outlined">
          add
        </span>
      </button>
    </div>
    <div class="search">
      <form>
        <input type="hidden" name="table" value="pagamento">
        <input type="hidden" name="operation" value="search">
        <input type="text" name="nome" placeholder="Forma de pagamento">
        <button type="submit" class="btn">
          <span>Pesquisar</span>
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
              <span>Nome</span>
            </div>
            <div class="content-th">
              <span>Ações</span>
            </div>
          </div>
        </div>
        <div class="content-tbody">
          <div class="content-tr">
            <div class="content-td">
              <span>Dinheiro</span>
            </div>
            <div class="content-td --content-td-actions">
              <button class="btn --btn-icon">
                <span class="material-symbols-outlined">
                  delete
                </span>
              </button>
              <button class="btn --btn-icon">
                <span class="material-symbols-outlined">
                  edit
                </span>
              </button>
            </div>
          </div>
          <div class="content-tr">
            <div class="content-td">
              <span>Pix</span>
            </div>
            <div class="content-td --content-td-actions">
              <button class="btn --btn-icon">
                <span class="material-symbols-outlined">
                  delete
                </span>
              </button>
              <button class="btn --btn-icon">
                <span class="material-symbols-outlined">
                  edit
                </span>
              </button>
            </div>
          </div>
          <div class="content-tr">
            <div class="content-td">
              <span>Credito</span>
            </div>
            <div class="content-td --content-td-actions">
              <button class="btn --btn-icon">
                <span class="material-symbols-outlined">
                  delete
                </span>
              </button>
              <button class="btn --btn-icon">
                <span class="material-symbols-outlined">
                  edit
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <script src="./scripts.js"></script>
</body>
</html>