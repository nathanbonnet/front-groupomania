import _ from 'lodash';
import "../../scss/style.scss";
import articleApi from '../../service/articleApi';
import authApi from "../../service/authApi";
import sharingApi from "../../service/sharingApi";
import moment from "moment";

const renderArticles = async () => {
    let articles = [];
    const blockContent = document.getElementById("content-article");

    articles = await articleApi.getArticlesByOwner();
    blockContent.innerHTML = "";

    for (const [key, article] of Object.entries(articles)) {
        const line = `
            <div class="card text-center">
                <div class="header-article">
                    <div>
                    <input type="button" data-target-id="${article.id}" class="btn btn-danger supprimer bouton-supprimer" value="supprimer l'article">
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
                    ${moment(article.date).format("DD/MM/YYYY, HH:mm")}
                </div>
            </div>
        `;
        blockContent.innerHTML += line;
    }
    [].forEach.call(document.querySelectorAll(".bouton-supprimer"), function(el) {
        el.addEventListener('click', () => handleDelete(el.dataset.targetId))
    });
}

const renderSharings = async () => {
    let sharings = [];
    const blockContent = document.getElementById("content-article-partager");

    sharings = await sharingApi.getSharingsByOwner()
    blockContent.innerHTML = "";

    for (const [key, sharing] of Object.entries(sharings)) {
        const Line = `
            <div data-id="${sharing.id}" class="card article-card text-center">
                <div id="author" class="card-header">
                    ${sharing.title}
                </div>
                <div class="card-body">
                    <p class="card-text" id="content">
                        ${sharing.content}
                    </p>
                </div>
                <div class="card-footer text-muted">
                    ${moment(sharing.date).format("DD/MM/YYYY, HH:mm")}
                </div>
            </div>
        `
        blockContent.innerHTML += Line;
    }
}

const handleDelete = async (id) => {
    await articleApi.deleteArticleById(id);
    await renderArticles();
}

const handleUser = async () => {
    // nom du compte
    const userName = document.getElementById("compte-name");
    const data = await authApi.getUserById()
    userName.innerHTML = `${data.firstName} ${data.lastName}`;
}

document.addEventListener("DOMContentLoaded", async function() {
    if (!authApi.isAuth()) {
        window.location.replace("sign-in.html");
    }

    await renderArticles();
    await renderSharings();
    await handleUser();

    const deconnexion = document.getElementById("deconnexion");
    deconnexion.addEventListener("click", authApi.logout);

    const suppressionCompte = document.getElementById("delete-compte");
    suppressionCompte.addEventListener("click", authApi.deleteUserById);
})
