import loginManager from "./login"
import RegistrationManager from "./register"

const navbarbtn = {
    registrationBtn: () => {
        document.querySelector("#registerBtn").addEventListener("click", () => {
            RegistrationManager()
        }
        )
    },
    registrationBtn: () => {
        document.querySelector("#logInbtn").addEventListener("click", () => {
            loginManager()

        })
    }
}

export default navbarbtn