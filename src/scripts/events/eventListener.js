import eventDataManager from "./evtDataMgr"
import eventList from "./eventList"
import clearEventForm from "./emptyEventFields"

const $ = document.querySelector.bind(document)


const saveEvent = () => {
    const theButton = $("#eventFormAction")

    theButton.addEventListener("click", () => {

        const newEvent = {
            userId: $("#userId").value,
            eventName: $("#eventName").value,
            eventDate: $("#eventDate").value,
            eventLocation: $("#eventLocation").value
        }
        if (theButton.textContent.startsWith("Save")) {


            console.log("new event:", newEvent)

            fetch("http://localhost:8088/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newEvent)

            }).then(clearEventForm)

        }
        else if (theButton.textContent.startsWith("Update")) {

            fetch(`http://localhost:8088/events/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newEvent)
            }).then(clearEventForm)
        }
    })
}


export default saveEvent