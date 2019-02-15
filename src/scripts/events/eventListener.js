import eventDataManager from "./evtDataMgr"
import eventList from "./eventList"
import clearEventForm from "./emptyEventFields"

const $ = document.querySelector.bind(document)


const saveEvent = () => {
    const theButton = $("#eventFormAction")

    theButton.addEventListener("click", () => {

        if (theButton.textContent.startsWith("Save")) {

            const newEvent = {
                eventName: $("#eventName").value,
                userId: $("#userId").value,
                eventLocation: $("#eventLocation").value,
                eventDate: $("#eventDate").value
            }
            eventDataManager.saveEvent(newEvent)
        }
    })
}

export default saveEvent