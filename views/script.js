import { register_user} from "./fetch.js";

///////// Post form register

const form_register = document.getElementById('register');

form_register.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const password = document.getElementById('psw').value;
    const pswConfirm = document.getElementById('cfm-psw').value;
    const span = document.querySelector('span')

    if(password !== pswConfirm){
        span.style.display='block'
        span.style.color='red'
        span.textContent ='Les mots de passe ne correspondent pas';
    } else {
        const userData = {
            nom,
            prenom,
            password
        };
        if (register_user(userData)){

            window.location.href = './connect.html';
        }
    }

});