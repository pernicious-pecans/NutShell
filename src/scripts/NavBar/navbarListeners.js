import newsManager from "../news/news-post-manager"
import navbars from "./navbar"
import formFunctions from "../events/eventForm"
import taskFunctions from "../tasks/taskForm"
const $ = document.querySelector.bind(document)

const navEventListeners = {
// loginButton() {
// $("#loginButton").addEventListener("click", () => {
// //add R.Nelson's login code here.
// //bring up the dashboard for the user if login is true
//   const UserID =  sessionStorage.get("activeUser"); //etc. etc. etc.
//     //insert Dom Printing code from all sections here (should we combine all of them into a single function first??)

//     //switch to general navbar
//     $("navbarSection").innerHTML = ""
//     $("navbarSection").innerHTML = navbars.navbarGeneral()
// })},

// navRegisterButton() {
// $("#navRegisterButton").addEventListener("click", () => {
// //bring up R.Nelson's register form
// })},

// registerButtonFinal() {
// $(Nelson Register Button).addEventLstener("click", () => {
// //open empty dashboard for new user

// //switch to general navbar
// $("navbarSection").innerHTML = ""
// $("navbarSection").innerHTML = navbars.navbarGeneral()
// })},

navNewsButton() {
$("#newsNavbar").addEventListener("click", () => {
//prints news form to DOM
newsManager.generateNewsForm()
})},

navTaskButton() {
$("#taskNavbar").addEventListener("click", () => {
//prints tasks form to DOM
taskFunctions()
})},

navEventButton() {
$("#eventNavbar").addEventListener("click", () => {
//prints events form to DOM
formFunctions()
})},

logoutButton() {
    $("#logoutButton").addEventListener("click", () => {
        sessionStorage.clear
        $("navbarSection").innerHTML = ""
        $("navbarSection").innerHTML = navbars.navbarLogin()

    })}
}

export default navEventListeners