import _ from 'lodash';
import "../../scss/style.scss";
import authApi, { isAuth } from "../../service/authApi";

  document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("register");
    button.addEventListener("click", () => {
  
      let firstName = document.getElementById("firstName");
      let lastName = document.getElementById("lastName");
      let email = document.getElementById("email");
      let password = document.getElementById("password");
  
      checkSubmit()

      function checkSubmit() {
          let button = document.getElementById("register");
          if(checkEmpty(firstName) && checkEmpty(lastName) && checkEmail(email) && checkEmpty(password)) {
                let signUp = {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    password: password.value,
                }

                authApi.signUp(signUp);
                
                button.disabled = false;
              } else {
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