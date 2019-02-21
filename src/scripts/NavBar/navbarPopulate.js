import navbars from "./navbar"
import navEventListeners from "./navbarListeners"
const $ = document.querySelector.bind(document)

navbarCreation = () => {
    $("#navbarSection").innerHTML = navbars.navbarGeneral()
    
}