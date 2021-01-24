import _ from 'lodash';
import "../../scss/style.scss";
import articleApi from '../../service/articleApi';

document.addEventListener("DOMContentLoaded", async function() {
    let button = document.getElementById("button");
    button.addEventListener("click", function(){
  
      let title = document.getElementById("title");
      let content = document.getElementById("content");
  
      checkSubmit()

      function checkSubmit() {
          
          if(checkEmpty(title) && checkEmpty(content)) {
                let createArticle = {
                    title: title.value,
                    content: content.value,
                }

                articleApi.postArticle(createArticle);
                
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

      function checkForm() {
        document.getElementById("title").addEventListener('keyup', (e) => {
          checkEmpty(e.target);
          checkSubmit()
        })
        document.getElementById("content").addEventListener('keyup', (e) => {
          checkEmpty(e.target);
          checkSubmit()
        })
      }
      
  });
})