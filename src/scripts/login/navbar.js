import loginManager from "./login"
import RegistrationManager from "./register"

const navbarbtn = {
    registrationBtn: () => {
        document.querySelector("#registerBtn").addEventListener("click", () => {
            RegistrationManager.generateRegistrationForm()
            RegistrationManager.listenForRegister()
        }
        )
    },
    logInbtn: () => {
        document.querySelector("#logInbtn").addEventListener("click", () => {
            loginManager.generateloginForm()
            loginManager.listenForlogin()

        })
    }
}

export default navbarbtn