import { userDataManager } from "./getLogInData"




const contactForm = () => {
    //adds event listener to the button
    document.getElementById("button").addEventListener("click", () => {
        //captures the user input values
        const userId = document.getElementById("userId").value
        const name = document.getElementById("name").value
        const phone = document.getElementById("phone").value
        const email = document.getElementById("email").value
        //creates an object with the user input as key values
        const contactObject = {
            name: name,
            phone: phone,
            email: email,
            userId: parseInt(userId)
        }

        // Get value of hidden input field
        const id = document.getElementById("contactId").value

        // If it has a non-blank value, we're editing
        if (id !== "") {
            // Edit the thing
            contactCollection.Put(id, contactObject).then(
                () => {
                    document.getElementById("contactId").value = ""
                    contactList()
                }
            )
        } else {
            //invokes the post method on the contactCollection object and passes it the newly created contact object
            contactCollection.Post(contactObject).then(contactList)

        }

    })
}




const $ = document.querySelector.bind(document)
const RegistrationManager = {
    listenForRegister: () => {
        document.querySelector("#registerButton").addEventListener("click", () => {
            const newUser = {
                username: $("#username").value,
                password: $("#password").value,
                firstName: $("#firstName").value,
                lastName: $("#lastName").value
            }

            // POST to API
            fetch("http://localhost:8088/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(r => r.json())
                .then((newUserObject) => {
                    generateRegisterForm(newUserObject.id)
                    contactForm()
                })

        })
    },
    generateRegistrationForm: () => {
        document.querySelector("#formContainer").innerHTML = `

            <label for="name">Email: </label>
            <input id="email" name="email" type="text">

            <label for="username">Username: </label>
            <input id="username" name="username" type="text">

            <label for="password">Password: </label>
            <input id="password" name="password" type="password">

            <label for="firstName">First Name: </label>
            <input id="firstName" name="firstName" type="text">

            <label for="lastName">Last Name: </label>
            <input id="lastName" name="lastName" type="text">

            <button id="registerButton">Register!</button>
        `
    }

}

export default RegistrationManager