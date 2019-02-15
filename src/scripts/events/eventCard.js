
const eventCard = (event)=>
{
    return`
    <section>
   <h2>${event.eventName}</h2>
    <p>${event.eventLocation}<p>
    <p>${event.eventDate}<p>
    <button id='delete--event--${event.id}'>Edit <strong>${event.eventName}</strong> Event </button>
    <button id='edit--event--${event.id}'>Delete <strong> ${event.eventName}</strong> Event</button>
    </section>
    `
}

export default eventCard
