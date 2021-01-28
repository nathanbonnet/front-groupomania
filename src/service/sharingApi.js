const token = localStorage.getItem("token");
function postSharing(data) {
    return fetch('http://localhost:3000/sharings', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + token 
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        response.json()
        window.location.replace("home.html");
    })
    .catch(function(error) {
        console.log(error.response);
        document.body.innerHTML = '<h1 style="color:red">une erreur est survenue sur le serveur</h1>'
    });
}

function getAllSharingsByArticleId(id) {
    return fetch('http://localhost:3000/articles/' + id + '/sharings', {
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

export default {
    postSharing, getAllSharingsByArticleId
}