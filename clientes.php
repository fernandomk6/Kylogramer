<!DOCTYPE html>
<html lang="pt-br">
<?php require("./templates/head.html"); ?>
<body>
  <?php require("./templates/header.html"); ?>
  <main>
    <div class="title">
      <h2>Clientes</h2>
      <button class="btn">
        <span class="material-symbols-outlined">
          add
        </span>
      </button>
    </div>
    <div class="search">
      <form>
        <input type="hidden" name="table" value="cliente">
        <input type="hidden" name="operation" value="search">
        <input type="text" name="nome" placeholder="Nome do cliente">
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
              <span>Nome</span>
            </div>
            <div class="content-th">
              <span>Telefone</span>
            </div>
            <div class="content-th">
              <span>Ações</span>
            </div>
          </div>
        </div>
        <div class="content-tbody">
          <div class="content-tr">
            <div class="content-td">
              <span>Fernando</span>
            </div>
            <div class="content-td">
              <span>85985680757</span>
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
              <span>Fernando Henrique Pontes</span>
            </div>
            <div class="content-td">
              <span>85985680757</span>
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
              <span>Fernando Henrique</span>
            </div>
            <div class="content-td">
              <span>85985680757</span>
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
</body>
</html>