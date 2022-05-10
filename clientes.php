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
          <button id="btn-add" class="btn btn--icon">
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
    <section id="add" class="section add">
      <section class="section-container">
        <div class="add-actions">
          <h2>Kylogramer</h2>
          <button id="btn-close-add" class="btn btn--icon btn--icon--alt">
            <span class="material-symbols-outlined">
              close
            </span>
          </button>
        </div>
        <p class="light-text">Cadastre aqui seus clientes</p>
        <form class="add-form">
          <div class="input-container">
            <label>
              <span>Nome</span>
              <input type="text" name="nome" placeholder="Nome do seu cliente">
            </label>
            <label>
              <span>Telefone</span>
              <input type="number" name="telefone" placeholder="Contato de seu cliente">
            </label>
          </div>
          <div class="submit-container">
            <button type="submit">
              <span class="material-symbols-outlined">
                done
              </span>
            </button>
          </div>
        </form>
      </section>
    </section>
  </main>
  <script src="./scripts.js"></script>
  <script src="./clientes.js"></script>
</body>
</html>