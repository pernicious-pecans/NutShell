import eventDataManager from "./evtDataMgr"
import eventList from "./eventList"
import clearEventForm from "./emptyEventFields"
import eventAction from "./cardEventListener"

const $ = document.querySelector.bind(document)


const saveEvent = () => {
    const theButton = $("#eventFormAction")

    theButton.addEventListener("click", () => {

        const newEvent = {
            // userId: $("#userId").value,
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
        }
    })
}


export default saveEvent