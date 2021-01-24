import jwtDecode from "jwt-decode";

function isAuth() {
    const token = localStorage.getItem("token");
    try {
        jwtDecode(token)
        return true
    } catch (e) {
        console.log(e.message)
        return false
    }
}

function signUp(signUp) {
    fetch('http://localhost:3000/users', {
        method: "POST",
        body: JSON.stringify(signUp),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        localStorage.setItem("token", response.token);
        window.location.replace("home.html");
    }).catch(function(error) {
        console.log(error.response);
        document.body.innerHTML = '<h1 style="color:red">une erreur est survenue sur le serveur</h1>'
    });
}

function login(contact) {
    fetch('http://localhost:3000/users/login', {
        method: "POST",
        body: JSON.stringify(contact),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        localStorage.setItem("token", response.token);
        window.location.replace("home.html");
    }).catch(function(error) {
        console.log(error.response);
        document.body.innerHTML = '<h1 style="color:red">une erreur est survenue sur le serveur</h1>'
    });
}

function deleteUserById(id) {
    return fetch('http://localhost:3000/users/'+id, {
        method: "DELETE",
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

function putUserById(id) {
    return fetch('http://localhost:3000/users/'+id, {
        method: "PUT",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .catch(function(error) {
        console.log(error.response);
        document.body.innerHTML = '<h1 style="color:red">une erreur est survenue sur le serveur</h1>'
    });
}


export default {
    isAuth,
    login,
    signUp,
    deleteUserById,
    putUserById
}
