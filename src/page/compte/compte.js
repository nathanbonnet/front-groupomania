import _ from 'lodash';
import "../../scss/style.scss";
import articleApi from '../../service/articleApi';
import authApi from "../../service/authApi";

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
                    ${article.date}
                </div>
            </div>
        `;
        blockContent.innerHTML += line;
    }
    [].forEach.call(document.querySelectorAll(".bouton-supprimer"), function(el) {
        el.addEventListener('click', () => handleDelete(el.dataset.targetId))
    });
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
    await handleUser();

    const deconnexion = document.getElementById("deconnexion");
    deconnexion.addEventListener("click", authApi.logout);

    const suppressionCompte = document.getElementById("delete-compte");
    suppressionCompte.addEventListener("click", authApi.deleteUserById);
})
