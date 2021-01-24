import _ from 'lodash';
import "../../scss/style.scss";
import authApi from "../../service/authApi";

document.addEventListener("DOMContentLoaded", function() {
    let button = document.getElementById("button");
    button.addEventListener("click", function(event){
        let error = document.getElementById("error");
        event.preventDefault();

        const email = document.getElementById("email");
        const password = document.getElementById("password");
        checkSubmit()

        function checkSubmit() {
            
            if(checkEmail(email) && checkEmpty(password)) {

                authApi.login({
                    email: email.value,
                    password: password.value,
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
})