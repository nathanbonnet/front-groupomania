import _ from 'lodash';
import "../../scss/style.scss";
import articleApi from '../../service/articleApi';
import authApi from "../../service/authApi";
import jwt_decode from "jwt-decode";

const fetchArticles = async () => {
    return await articleApi.getArticles();
}

document.addEventListener("DOMContentLoaded", async function() {
    let articles = [];

    let token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    console.log(decoded)

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
        if (article.users_id === decoded.userId) {
            console.log(article)
            let Line = `
            <div class="card text-center">
                <div class="header-article">
                    <div>
                    <input type="button" data-target-id="${article.id}" class="btn btn-danger supprimer bouton-supprimer" value="supprimer l'article">
                    <a class="btn btn-secondary modification bouton-modifier">modifier l'article</a>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">
                        ${article.title}
                    </h5>
                    <p class="card-text">
                        ${article.content}
                    </p>
                </div>
                <div class="card-footer text-muted">
                    2 days ago
                </div>
            </div>`
            document.getElementById("content-article").innerHTML += Line;
        }
    }

    [].forEach.call(document.querySelectorAll(".bouton-modifier"), function(el) {
        el.addEventListener('click', function() {
            console.log("test")
        })
    }),
    [].forEach.call(document.querySelectorAll(".bouton-supprimer"), function(el) {
        el.addEventListener('click', function(event) {
            
            console.log("testt")
        })
    })
})
