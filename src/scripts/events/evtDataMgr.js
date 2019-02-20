
const eventDataManager = {

    fetchEvents: () => {
        return fetch("http://localhost:8088/events")
            .then(Response => Response.json())
    },
    deleteEvent: (eventId) => {
        console.log(`http://localhost:8088/events/${eventId}`)

        return fetch(`http://localhost:8088/events/${eventId}`, {
            method: "DELETE"
        }).then(Response => Response.json())
    },
    getEvent: (eventId) => {
        return fetch(`http://localhost:8088/events/${eventId}`)
            .then(events => events.json())
        },
    editEvent: (eventId, event) => {
        console.log("event", event)
        return fetch(`http://localhost:8088/events/${eventId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        }).then(event => event.json())
      },
    saveEvent: (newEvent) => {
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent)
        }).then(event => event.json())
    },
}

export default eventDataManager