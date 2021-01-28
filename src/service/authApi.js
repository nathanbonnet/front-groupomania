import jwtDecode from "jwt-decode";
const token = localStorage.getItem("token");

function isAuth() {
    try {
        jwtDecode(token)
        return true
    } catch (e) {
        console.log(e.message)
        return false
    }
}

function logout() {
    window.localStorage.removeItem("token");
    window.location.replace("sign-in.html");
}

function deleteUserById(e) {
    e.preventDefault();
    return fetch('http://localhost:3000/users/'+jwtDecode(token).userId, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + token 
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        logout()
        return response
    }).catch(function(error) {
        console.log(error.response);
        document.body.innerHTML = '<h1 style="color:red">une erreur est survenue sur le serveur</h1>'
    });
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

function putUserById(data) {
    return fetch('http://localhost:3000/users/'+jwtDecode(token).userId, {
        method: "PUT",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + token 
        },
        body: JSON.stringify(data),
    })
    .then(response =>  {
        response.json()
        window.location.replace("compte.html");
    })
    .catch(function(error) {
        console.log(error.response);
        document.body.innerHTML = '<h1 style="color:red">une erreur est survenue sur le serveur</h1>'
    });
}

function getUserById() {
    return fetch('http://localhost:3000/users/'+jwtDecode(token).userId, {
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
    isAuth,
    login,
    signUp,
    deleteUserById,
    putUserById,
    logout,
    getUserById
}
