import eventDataManager from "./evtDataMgr"
import eventList from "./eventList"

const $ = document.querySelector.bind(document)


const saveEvent = () => {

    const theButton = $("#eventFormAction")
    theButton.addEventListener("click", () => {

        if(theButton.textContent.startsWith("Save")){
            const newEvent = {
                eventName: $("#eventName").value,
                userId: $("#userId").value,
                eventLocation: $("#eventLocation").value,
                eventDate: $("#eventDate").value
            }
            eventDataManager.saveEvent(newEvent).then(
                () => {
                 //empty form fields
                    // repupulate eventList()
                    console.log("it listened.")
                }
            )
        }



    })
}


export default saveEvent