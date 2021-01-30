import _ from 'lodash';
import "../../scss/style.scss";
import articleApi from '../../service/articleApi';
import authApi from "../../service/authApi";
import sharingApi from '../../service/sharingApi';
import moment from "moment";
import jwtDecode from 'jwt-decode';

const handleDelete = async (id) => {
  await articleApi.deleteArticleById(id);
  await renderArticles();
}

const renderArticles = async () => {
  let articles = [];
  articles = await articleApi.getArticles();

  
  const token = localStorage.getItem("token");
  const {userId, isAdmin} = jwtDecode(token);

  const contentArticle = document.getElementById("content-article");

  contentArticle.innerHTML = "";
  for (const [key, article] of Object.entries(articles)) {
    const Line = `
      <div data-id="${article.id}" class="card article-card text-center">
        ${isAdmin || userId === article.users_id ? '<button data-target-id="'+ article.id +'" class="suppression-admin btn btn-danger">supprimer</button>' : ''}
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
          ${moment(article.date).format("DD/MM/YYYY, HH:mm")}
        </div>
        <div class="sharings"></div>
      </div>
    `
    contentArticle.innerHTML += Line;
  }
  [].forEach.call(document.querySelectorAll(".suppression-admin"), function(el) {
    el.addEventListener('click', () => handleDelete(el.dataset.targetId))
  });
  await renderSharings();
}

const renderSharings = async () => {
  const articles = document.querySelectorAll(".article-card");
  articles.forEach(async function(el) {
    const sharings = await sharingApi.getAllSharingsByArticleId(el.dataset.id)
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
})
