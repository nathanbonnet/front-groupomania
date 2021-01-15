import _ from 'lodash';
import "../style.scss";

fetch('http://localhost:3000/users')
    .then(status)
    .then(json)
    .then(function(data) {
        affichageCompte(data);
    }).catch(function(error) {
        console.error(error);
        document.body.innerHTML = '<h1 style="color:red">une erreur est survenue sur le serveur</h1>'
    })
;

function affichageCompte(response) {
    console.log(response);
    let name = document.getElementById("name");
    name.innerHTML = response.firstName;
}

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json()
}