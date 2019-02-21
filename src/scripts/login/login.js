import userinfo from "./apitester"
import usersInfo from "./apitester";
const $ = document.querySelector.bind(document)
const loginManager = {
    listenForlogin: () => {
        document.querySelector("#registerButton").addEventListener("click", () => {
            // Collect all user input
            // Create a user object
            const activeUser = {
                username: $("#username").value,
                password: $("#password").value,
            }
            userinfo.then()
            if (activeUser.username === usersInfo.users.username && activeUser.password === usersInfo.users.password) {
                // Show contact entry form
                mainpage()
            } else {
                alert("invalid credentials")
            }
        })

    },
    generateloginForm: () => {
        document.querySelector("#formContainer").innerHTML = `
                <label for="username">Username: </label>
                <input id="username" name="username" type="text">
    
                <label for="password">Password: </label>
                <input id="password" name="password" type="password">
    
                <button id="registerButton">Log In!</button>
        `
    }

}





export default loginManager




