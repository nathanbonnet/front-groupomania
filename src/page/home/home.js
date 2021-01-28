import _ from 'lodash';
import "../../scss/style.scss";
import articleApi from '../../service/articleApi';
import authApi from "../../service/authApi";
import sharingApi from '../../service/sharingApi';

const renderArticles = async () => {
  let articles = [];
  articles = await articleApi.getArticles();

  for (const [key, article] of Object.entries(articles)) {
    const Line = `
      <div data-id="${article.id}" class="card article-card text-center">
      <div class="suppression-admin"></supprimer>
        <div id="author" class="card-header">
          ${article.firstName} ${article.lastName}
        </div>
        <div class="card-body">
          <h5 id="title" class="card-title">
              ${article.title}
          </h5>
          <p class="card-text" id="content">
              ${article.content}
          </p>
          <a href="sharing.html?articleId=${article.id}" class="btn btn-partager btn-primary">Partager</a>
        </div>
        <div class="card-footer text-muted">
          ${article.date}
        </div>
        <div class="sharings"></div>
      </div>
    `
    document.getElementById("content-article").innerHTML += Line;
  }
}

const renderSharings = async () => {
  const articles = document.querySelectorAll(".article-card");
  articles.forEach(async function(el) {
    const sharings = await sharingApi.getAllSharingsByArticleId(el.dataset.id)
    console.log(sharings);
    for (const [key, sharing] of Object.entries(sharings)) {
      const Line = `
        <div data-id="${sharing.id}" class="card article-card text-center">
          <div id="author" class="card-header">
            ${sharing.firstName} ${sharing.lastName}
          </div>
          <div class="card-body">
            <p class="card-text" id="content">
                ${sharing.content}
            </p>
          </div>
          <div class="card-footer text-muted">
            ${sharing.date}
          </div>
        </div>
      `
      el.querySelector(".sharings") .innerHTML += Line;
    }
  })
}

document.addEventListener("DOMContentLoaded", async function() {

    if(!authApi.isAuth()) {
        window.location.replace("sign-in.html");
    }

    let deconnexion = document.getElementById("deconnexion");

    deconnexion.addEventListener("click", authApi.logout);
    await renderArticles();
    await renderSharings();


    // function articleId() {
    //     let Line = `
    //     <div class="card-body">
    //         <textarea name="le contenu" placeholder="contenu de l'article" class="form-control" id="content" rows="3"></textarea>
    //         <span id="error"></span>
    //       </div>
    //       <div class="card-footer text-muted">
    //         <a href="#" id="button" class="btn btn-primary">Partager</a>
    //       </div>
    //     `
    //     document.getElementById("content-article").innerHTML += Line;
    // }
})
