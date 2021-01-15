import _ from 'lodash';
import "../style.scss";

  document.addEventListener("DOMContentLoaded", function() {
    let button = document.getElementById("button");
    button.addEventListener("click", function(){
  
      let firstName = document.getElementById("firstName");
      let lastName = document.getElementById("lastName");
      let email = document.getElementById("email");
      let password = document.getElementById("password");
  
      checkSubmit()

      function checkSubmit() {
          
          if(checkEmpty(firstName) && checkEmpty(lastName) && checkEmail(email) && checkEmpty(password)) {
              document.getElementById("button").addEventListener("click", function(event){
                  let signUp = {
                      firstName: firstName.value,
                      lastName: lastName.value,
                      email: email.value,
                      password: password.value,
                  }
                  console.log(signUp)
                  localStorage.setItem("signUp", JSON.stringify(signUp));


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
              })
                  let button = document.getElementById("button");
                  button.disabled = false;
              } else {
                  let button = document.getElementById("button");
                  button.disabled = true;
              }
      }

      checkForm()

      function checkEmpty(input) {
          if(input.value === "") {
              error.textContent = `${input.name} est vide`;
              error.setAttribute("class", "btn btn-danger")
              return false
          }else {
              error.textContent = ``;
              error.setAttribute("class", "")
              return true
          }
      }

      function checkEmail(input) {
          let regex = /\S+@\S+\.\S+/; 
          if(!regex.test(input.value)) {
              error.textContent = `le format de l'email n'est pas correct`;
              error.setAttribute("class", "btn btn-danger")
              return false
          }else {
              error.textContent = ``;
              return true
          }
      }

      function checkForm() {
        document.getElementById("firstName").addEventListener('keyup', (e) => {
          checkEmpty(e.target);
          checkSubmit()
        })
        document.getElementById("lastName").addEventListener('keyup', (e) => {
          checkEmpty(e.target);
          checkSubmit()
        })
        document.getElementById("email").addEventListener('keyup', (e) => {
            checkEmpty(e.target);
            checkEmail(e.target);
            checkSubmit()
        })
        document.getElementById("password").addEventListener('keyup', (e) => {
            checkEmpty(e.target);
            checkSubmit()
        })
        document.getElementById("button").addEventListener('submit', (e) => {
            e.preventDefault();
            checkForm();
        })
      }
      
  });
  });