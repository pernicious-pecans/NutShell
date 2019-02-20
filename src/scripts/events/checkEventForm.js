
import saveEvent from "./eventListener"

const $ = document.querySelector.bind(document)


const checkEventForm = () => {
    const theButton = $("#eventFormAction")

    theButton.addEventListener("click", () => {
        const theName= $("#eventName").value;
        const  when= $("#eventDate").value;
        const location = $("#eventLocation").value;

        if (location = "") {
            alert("WHERE IS IT? WHERE ARE WE GOING?")
            return false;
        }
        if (theName = "") {
            alert("WHAT IS IT YOU'RE DOING?  WHAT'S IT CALLED?")
            return false;
        }
        if (when = " ") {
            alert("WHEN IS IT??  WHAT DAY?")
            return false
        }
        else {
            saveEvent()
        }

    })
}
export default checkEventForm