
const eventCard = (event)=>
{
    return`
    <section class="list">
    <span>
    <p><strong>What:</strong>  ${event.eventName}  <strong>
    Where:</strong>   ${event.eventLocation} <strong>
    When:</strong> ${event.eventDate}
    <button class="button--card" id='Edit--${event.id}'>Edit This Event </button>
    <button class="button--card" id='Delete--${event.id}'>Delete This Event</button></p>
    </span>
    </section>
    `
}

export default eventCard
