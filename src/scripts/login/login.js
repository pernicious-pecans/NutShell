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
                 fetch("http://localhost:8088/users").then(response =>
                    response.json()
                    ).then()
                        if (activeUser.username === users.username && activeUser.password === users.password) {
                            sessionstorage.setItem("credentials", `${users.id}`)
                            .then(() => {
                                // Show contact entry form
                                mainpage()
                            })
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
    
                <button id="registerButton">Register!</button>
        `
    }

}





export default loginManager




