import usersInfo from "./apitester";
const $ = document.querySelector.bind(document)
const loginManager = {
    listenForlogin: () => {
        document.querySelector("#registerButton").addEventListener("click", () => {
            // Collect all user input
            // Create a user object
            const activeUser = {
                username: $("#username").value,
                password: $("#password").value
            }
            .then( ()=> {
            if (activeUser.username === usersInfo.getUsername.username && activeUser.password === usersInfo.getUserPassword.password) {
                // Show contact entry form
                console.log("it worked")
            } else {
                console.log("invalid credentials")
            }})
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




