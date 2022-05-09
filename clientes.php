<!DOCTYPE html>
<html lang="pt-br">
<?php require("./templates/head.html"); ?>
<body>
  <?php require("./templates/header.html"); ?>
  <main>
    <div class="actions">
      <div class="actions-container">
        <button id="btn-show-nav" class="btn btn--icon btn--hamburguer">
          <span class="material-symbols-outlined">
            menu
          </span>
        </button>
        <button id="btn-add" class="btn btn--icon">
          <span class="material-symbols-outlined">
            add
          </span>
        </button>
      </div>
    </div>
    <div class="search">
      <div class="search-container">
        <form>
          <input type="hidden" name="table" value="cliente">
          <input type="hidden" name="operation" value="search">
          <input type="text" name="nome" placeholder="Nome do cliente">
          <button type="submit" class="btn btn--icon">
            <span class="material-symbols-outlined">
              search
            </span>
          </button>
        </form>
      </div>
    </div>
    <div class="content">
      <div class="content-container">
        <div class="content-table">
          <div class="content-thead">
            <div class="content-tr">
              <div class="content-th">
                <span>Nome</span>
              </div>
              <div class="content-th">
                <span>Telefone</span>
              </div>
              <div class="content-th content-th--actions">
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
              <div class="content-td content-td--actions">
                <button class="btn btn--icon">
                  <span class="material-symbols-outlined">
                    delete
                  </span>
                </button>
                <button class="btn btn--icon">
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
              <div class="content-td content-td--actions">
                <button class="btn btn--icon">
                  <span class="material-symbols-outlined">
                    delete
                  </span>
                </button>
                <button class="btn btn--icon">
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
              <div class="content-td content-td--actions">
                <button class="btn btn--icon">
                  <span class="material-symbols-outlined">
                    delete
                  </span>
                </button>
                <button class="btn btn--icon">
                  <span class="material-symbols-outlined">
                    edit
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <script src="./scripts.js"></script>
</body>
</html>