import eventDataManager from "./evtDataMgr"
import eventCard from "./eventCard"

const $ = document.querySelector.bind(document)


const spot = $("#events_display")
//list all events

const eventList = {

    list: () => {
        eventDataManager.fetchEvents().then(
            (parsedEvents) => {
                spot.innerHTML = "";

                // sortEvents.push(parsedEvents)
                parsedEvents.sort(function(eventA, eventB){
                     let dateA = new Date(eventA.eventDate)
                     let dateB =new Date(eventB.eventDate)
                    return dateA - dateB
                })

                parsedEvents.forEach(event => {
                    spot.innerHTML += eventCard(event)

                })
            }
        )
    }
}

export default eventList
//then change the list to show only those items related to the user id that is in session