import './Components/main-menu/main-menu.js';
import './Components/forms/customer-form.js';
import './Components/listas/customer-lista.js';
import './Components/rutas/aerolinea-rutas.js';
import './Components/flota/aerolinea-flota.js';

const URL_API = "http://localhost:3000";
function tabMenuPage (){ 
    document.querySelectorAll(".nav-link").forEach((val, id) => {
        val.addEventListener("click", (e)=>{
            let data = JSON.parse(e.target.dataset.verocultar);
            let cardVer = document.querySelector(data[0]);
            cardVer.style.display = 'block';
            data[1].forEach(card => {
                let cardActual = document.querySelector(card);
                cardActual.style.display = 'none';
            });
            e.stopImmediatePropagation();
            e.preventDefault();
        })
    })
}

export {
    tabMenuPage
};