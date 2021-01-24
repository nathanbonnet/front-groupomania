import _ from 'lodash';
import "../../scss/style.scss";
import articleApi from '../../service/articleApi';
import authApi from "../../service/authApi";

const fetchArticles = async () => {
    return await articleApi.getArticles();
}

document.addEventListener("DOMContentLoaded", async function() {
    let articles = [];

    if(!authApi.isAuth()) {
        window.location.replace("sign-in.html");
    }

    let deconnexion = document.getElementById("deconnexion");

    deconnexion.addEventListener("click", function(event){
        window.localStorage.removeItem("token");
        window.location.replace("sign-in.html");
    })

    articles = await fetchArticles();
    console.log(articles)
    for (const [key, article] of Object.entries(articles)) {
        let Line = `
        <div class="card text-center">
          <div id="author" class="card-header">
            ${article.users_id}
          </div>
          <div class="card-body">
            <h5 id="title" class="card-title">
                ${article.title}
            </h5>
            <p class="card-text" id="content">
                ${article.content}
            </p>
            <a href="#" class="btn btn-primary">partager</a>
          </div>
          <div class="card-footer text-muted">
            2 days ago
          </div>
        </div>`
        document.getElementById("content-article").innerHTML += Line;
    }
})
