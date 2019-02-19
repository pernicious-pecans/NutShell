import {userDataManager} from "./getLogInData"

currentUsersId = userDataManager.getUser;

const generateRegisterForm = (currentUsersId) => {
    document.querySelector("#formContainer").innerHTML = `
        <h1>New User</h1>
        <input type="hidden" id="userId" value="${currentUsersId.users.id}">
        <input type="hidden" id="contactId">
        <label for="name">Email: </label>
        <input id="email" type="text">
        <button id="button">Register Your Account!</button>       
        <label for="name">User Name: </label>
        <input id="userName" type="text">
        <label for="name">Passwore: </label>
        <input id="Passwore" type="text" placeholder="password1234">
        <label for="name">First Name</label>
        <input id="firstName" type="text" placeholder="John">
        <label for="name">Last Name</label>
        <input id="lastName" type="text" placeholder="Smith">
    `
}

export default generateRegisterForm