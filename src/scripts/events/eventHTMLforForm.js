
/*
1. Name of event
2. Date of event
3. Location of event

**Given** a user has entered in all details of an event
**When** the user performs a gesture to save the event
**Then** the event should be displayed in the application in the `Events` component
*/

const formHTML = () => {

        return `
        <section class="inputForm" name="eventForm">
                <input id="eventId" name="eventId" ></input>
                <input  id="userId" name="userId" value=1></input>

            <fieldset>
                <label class="label" for="eventName"> Name of Event </label>
                <input id="eventName" type="text" required class="requiredEventInput"></input>
            </fieldset>

            <fieldset>
                <label class="label" for="eventDate"> Date of Event </label>
                <input min="2019-02-18" id="eventDate" type="date" class="requiredEventInput" pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}" ></input>
            </fieldset>

            <fieldset>
                <label class="label" for="eventLocation"> Location of Event </label>
                <input id="eventLocation" type="text" required class="requiredEventInput"></input>
            </fieldset>

            <button id="eventFormAction">Save Event</button>
            </section>
        `
    }

export default formHTML