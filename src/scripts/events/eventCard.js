
const eventCard = (event)=>
{
    return`
   <h2> ${event.eventName}<h2>
    <p>${event.eventLocation}<p>
    <p>${event.eventDate}<p>
    <button id='delete--event--${event.id}'>Delete ${event.eventName} </button>
    <button id='edit--event--${event.id}'>Delete ${event.eventName} </button>

    `
}

export default eventCard
