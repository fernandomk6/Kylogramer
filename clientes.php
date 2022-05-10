<!DOCTYPE html>
<html lang="pt-br">
<?php require("./templates/head.html"); ?>
<body>
  <?php require("./templates/header.html"); ?>
  <main>
    <section id="actions" class="section">
      <div class="section-container">
        <div class="row-between">
          <button id="btn-show-nav" class="btn btn--icon btn--hamburguer">
            <span class="material-symbols-outlined">
              menu
            </span>
          </button>
          <button id="btn-show-modal-add" class="btn btn--icon">
            <span class="material-symbols-outlined">
              add
            </span>
          </button>
        </div>
      </div>
    </section>
    <section id="search" class="section">
      <div class="section-container">
        <form class="form-row">
          <div class="input-container">
            <input class="input-default" type="text" name="nome" placeholder="Nome do cliente">
          </div>
          <div class="submit-container">
            <button type="submit" class="btn btn--icon">
              <span class="material-symbols-outlined">
                search
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
    <section id="content" class="section">
      <div class="section-container">
        <div class="table">
          <div class="thead">
            <div class="tr">
              <div class="th">
                <span>Nome</span>
              </div>
              <div class="th">
                <span>Telefone</span>
              </div>
              <div class="th th--actions">
                <span>Ações</span>
              </div>
            </div>
          </div>
          <div class="tbody">
            <div class="tr">
              <div class="td">
                <span>Fernando</span>
              </div>
              <div class="td">
                <span>85985680757</span>
              </div>
              <div class="td td--actions">
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
            <div class="tr">
              <div class="td">
                <span>Fernando Henrique Pontes</span>
              </div>
              <div class="td">
                <span>85985680757</span>
              </div>
              <div class="td td--actions">
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
            <div class="tr">
              <div class="td">
                <span>Fernando Henrique</span>
              </div>
              <div class="td">
                <span>85985680757</span>
              </div>
              <div class="td td--actions">
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
    </section>
    <section id="modal-add" class="section">
      <section class="section-container">
        <p class="description">Cadastre seu cliente</p>
        <form id="modal-add-form" class="form-column">
          <div class="input-container">
            <span>Nome</span>
            <input id="add-nome" class="input-default" type="text" name="nome" placeholder="Nome do seu cliente">
            <span>Telefone</span>
            <input id="add-telefone" class="input-default" type="number" name="telefone" placeholder="Contato de seu cliente">
          </div>
          <div class="submit-container">
            <button id="btn-close-modal-add" type="button" class="btn btn--error">
              <span class="material-symbols-outlined">
                cancel
              </span>
            </button>
            <button type="submit" class="btn btn--master">
              <span class="material-symbols-outlined">
                done
              </span>
            </button>
          </div>
        </form>
      </section>
    </section>
    <section id="modal-message" class="modal-message">
      <div class="row-between">
        <p></p>
        <button id="btn-close-modal-message" class="btn btn--icon">
          <span class="material-symbols-outlined">
            done
          </span>
        </button>
      </div>
    </section>
  </main>
  <script src="./scripts.js"></script>
  <script src="./clientes.js"></script>
</body>
</html>