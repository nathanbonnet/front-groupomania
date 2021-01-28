
const token = localStorage.getItem("token");
function getArticles() {
    return fetch('http://localhost:3000/articles', {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + token 
        }
    })
    .then(response => response.json())
    .catch(function(error) {
        console.log(error.response);
        document.body.innerHTML = '<h1 style="color:red">une erreur est survenue sur le serveur</h1>'
    });
}
function getArticlesByOwner() {
    return fetch('http://localhost:3000/my_articles', {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + token 
        }
    })
    .then(response => response.json())
    .catch(function(error) {
        console.log(error.response);
        document.body.innerHTML = '<h1 style="color:red">une erreur est survenue sur le serveur</h1>'
    });
}


function getArticleById(id) {
    return fetch('http://localhost:3000/articles/'+id, {
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        return response
    }).catch(function(error) {
        console.log(error.response);
        document.body.innerHTML = '<h1 style="color:red">une erreur est survenue sur le serveur</h1>'
    });
}

function postArticle(createArticle) {
    fetch('http://localhost:3000/articles', {
        method: "POST",
        body: JSON.stringify(createArticle),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + token 
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        window.location.replace("home.html");
    }).catch(function(error) {
        console.log(error.response);
        document.body.innerHTML = '<h1 style="color:red">une erreur est survenue sur le serveur</h1>'
    });
}

function deleteArticleById(id) {
    return fetch('http://localhost:3000/articles/'+id, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + token 
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        return response
    }).catch(function(error) {
        console.log(error.response);
        document.body.innerHTML = '<h1 style="color:red">une erreur est survenue sur le serveur</h1>'
    });
}

function putArticleById(id) {
    return fetch('http://localhost:3000/articles/'+id, {
        method: "PUT",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        return response
    }).catch(function(error) {
        console.log(error.response);
        document.body.innerHTML = '<h1 style="color:red">une erreur est survenue sur le serveur</h1>'
    });
}

export default {
    getArticles,
    deleteArticleById,
    getArticleById,
    putArticleById,
    postArticle,
    getArticlesByOwner
}
