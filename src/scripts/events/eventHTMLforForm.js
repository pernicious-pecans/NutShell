import eventDataManager from "./evtDataMgr"
const $ = document.querySelector.bind(document)

/*
1. Name of event
2. Date of event
3. Location of event

**Given** a user has entered in all details of an event
**When** the user performs a gesture to save the event
**Then** the event should be displayed in the application in the `Events` component
*/

const post = $("#events_input")
const formFunc = () => {

    seeEventForm: () => {
        return `
        <section>
                <input id="eventId" name="eventId" type="hidden"></input>

            <fieldset>
                <label class="label" for="eventId"> Name of Event </label>
                <input id="eventId" type="text"></input>
            </fieldset>
       
            <fieldset>
                <label class="label" for="eventId"> Name of Event </label>
                <input id="eventId" type="text"></input>
            </fieldset>
        
          

        </section>
        `



    }

}
