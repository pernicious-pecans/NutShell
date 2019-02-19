import eventDataManager from "./evtDataMgr";
import saveEvent from "./eventListener"
import eventList from "./eventList"

const $ = document.querySelector.bind(document)

const listArea = $("#events_display")

const eventAction = () => {

{/* <article id="events_input"> </article>
    <article id="events_display"> </article> */}
    listArea.addEventListener("click", () => {


        if (event.target.id.startsWith("Edit")) {



            let theId = parseInt(event.target.id.split("--")[1])

            eventDataManager.getEvent(theId).then(
                (event) => {
                         $("#eventId").value = event.id,
                        $("#userId").value = event.userId,
                        $("#eventDate").value = event.eventDate,
                        $("#eventLocation").value = event.eventLocation,
                        $("#eventName").value = event.eventName,
                        $("#eventFormAction").textContent = "Update Event"
                    })
            .then(() => saveEvent())
            .then(() => eventList)


        } else if (event.target.id.startsWith("Delete")) {
            console.log("in the delete button")
            let id = parseInt(event.target.id.split("--")[1])
            eventDataManager.deleteEvent(id)
            .then(()=>
                $("#events_display").innerHTML = ""
            ).then(() => eventList.list())
        }
    })
}




export default eventAction