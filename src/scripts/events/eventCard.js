import eventDataManager from "./evtDataMgr"

const eventCard = (event)=>
{
    return`
   <h2> ${event.eventName}<h2>
    <p>${event.eventLocation}<p>
    <p>${event.eventDate}<p>`
}

export default eventCard
