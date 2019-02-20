import eventDataManager from "./evtDataMgr"
import eventList from "./eventList"
import clearEventForm from "./emptyEventFields"
import checkEventForm from "./checkEventForm"

const $ = document.querySelector.bind(document)


const saveEvent = () => {

    const theName = $("#eventName").value;
    const when = $("#eventDate").value;
    const location = $("#eventLocation").value;

    const theButton = $("#eventFormAction")

    theButton.addEventListener("click", () => {

        checkEventForm: (theName, when, location)


        const newEvent = {
            userId: $("#userId").value,
            eventName: $("#eventName").value,
            eventDate: $("#eventDate").value,
            eventLocation: $("#eventLocation").value
        }

        if (theButton.textContent.startsWith("Save")) {
            console.log("new event:", newEvent)

            eventDataManager.saveEvent(newEvent)

                .then(() => eventList.list())
                .then(() => clearEventForm())
        }
        else if (theButton.textContent.startsWith("Update")) {

            const id = $("#eventId").value

            eventDataManager.editEvent(parseInt(id), newEvent)

                .then(() => eventList.list())
                .then(() => clearEventForm())
                .then(() => {
                    document.querySelector("#eventFormAction").textContent = "Save Event"
                })
        }
    })
}



export default saveEvent