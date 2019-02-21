import eventDataManager from "./evtDataMgr"
import eventList from "./eventList"
import clearEventForm from "./emptyEventFields"

const $ = document.querySelector.bind(document)


const saveEvent = () => {

    const theButton = $("#eventFormAction")

    theButton.addEventListener("click", () => {


        if (theButton.textContent.startsWith("Save")) {


            if ($("#eventLocation").value === null || $("#eventLocation").value === "" || $("#eventLocation").value === undefined) {
                return alert("WHERE IS IT? WHERE ARE WE GOING?")
            }
            if ($("#eventName").value === null || $("#eventName").value === undefined || $("#eventName").value === "") {
                return alert("WHAT IS IT YOU'RE DOING?  WHAT'S IT CALLED?")
            }
            if ($("#eventDate").value === null || $("#eventDate").value === undefined || $("#eventDate").value === "") {
                return alert("WHEN IS IT??  WHAT DAY?");
            } else {
                const newEvent = {
                    userId: $("#userId").value,
                    eventName: $("#eventName").value,
                    eventDate: $("#eventDate").value,
                    eventLocation: $("#eventLocation").value
                }

                eventDataManager.saveEvent(newEvent)

                    .then(() => eventList.list())
                    .then(() => clearEventForm())
                console.log("new event added:", newEvent)
            }
        }
        if (theButton.textContent.startsWith("Update")) {

            if ($("#eventLocation").value === null || $("#eventLocation").value === "" || $("#eventLocation").value === undefined) {
                return alert("WHERE IS IT? WHERE ARE WE GOING?")
            }
            if ($("#eventName").value === null || $("#eventName").value === undefined || $("#eventName").value === "") {
                return alert("WHAT IS IT YOU'RE DOING?  WHAT'S IT CALLED?")
            }
            if ($("#eventDate").value === null || $("#eventDate").value === undefined || $("#eventDate").value === "") {
                return alert("WHEN IS IT??  WHAT DAY?");
            }
            else {
                const newEvent = {
                    userId: $("#userId").value,
                    eventName: $("#eventName").value,
                    eventDate: $("#eventDate").value,
                    eventLocation: $("#eventLocation").value
                }
                const id = $("#eventId").value

                eventDataManager.editEvent(parseInt(id), newEvent)

                    .then(() => eventList.list())
                    .then(() => clearEventForm())
                    .then(() => {
                        document.querySelector("#eventFormAction").textContent = "Save Event"
                    })
                console.log(":", newEvent)
            }
        }

    })

}


export default saveEvent