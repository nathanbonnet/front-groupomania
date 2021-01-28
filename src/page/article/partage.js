import _ from 'lodash';
import "../../scss/style.scss";
import authApi from "../../service/authApi";
import sharingApi from "../../service/sharingApi";

const url = new URL(window.location.href);
const articleId = url.searchParams.get("articleId");

const handleSharing = async () => {
    const content = document.getElementById("content")
    await sharingApi.postSharing({
        content: content.value,
        articles_id: articleId
    });
}

document.addEventListener("DOMContentLoaded", async function() {
    if (!authApi.isAuth()) {
        window.location.replace("sign-in.html");
    }

    document.querySelector(".card-header").innerHTML += articleId;
    document.getElementById("partage").addEventListener("click", handleSharing)
})