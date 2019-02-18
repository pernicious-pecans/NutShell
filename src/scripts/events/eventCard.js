
const eventCard = (event)=>
{
    return`
    <section>
   <h2>${event.eventName}</h2>
    <p>${event.eventLocation}<p>
    <p>${event.eventDate}<p>
    <button class="event-card--button" id='Edit--${event.id}'>Edit ${event.eventName} Event </button>
    <br>
    <button class="event-card--button" id='Delete--${event.id}'>Delete ${event.eventName} Event</button>
    </section>
    `
}

export default eventCard
