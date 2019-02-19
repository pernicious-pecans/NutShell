const $ = document.querySelector.bind(document)

const eventDataManager = {

    fetchEvents: () => {
        return fetch("http://localhost:8088/events")
            .then(Response => Response.json())

            .then(parsedEvents => {
                console.log(parsedEvents)
                return parsedEvents
            })
    },
    deleteEvent: (eventId) => {
        return fetch(`http://localhost:8088/events/${eventId}`, {
            method: "DELETE"
        })
    },
    getEvent: (eventId) => {
        return fetch(`http://localhost:8088/events/${eventId}`)
            .then(events => events.json())
            .then(parsedEvent => {
                return parsedEvent
            })

    },
    editEvent: (eventId, event) => {
        return fetch(`http://localhost:8088/events/${eventId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })
    },
    saveEvent: (newEvent) => {
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent)
        })
    },
}

export default eventDataManager