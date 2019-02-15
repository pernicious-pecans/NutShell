/*
**When** the user clicks an affordance to enter a new event in the application
**Then** a form should be presented to the user in which the following properties of the event can be provided

1. Name of event
2. Date of event
3. Location of event

**Given** a user has entered in all details of an event
**When** the user performs a gesture to save the event
**Then** the event should be displayed in the application in the `Events` component

**Given** a user has entered in 1, or more, events
**When** the event component is updated
**Then** the next event on the agenda should have bold text
**And** it should be slightly larger in size
**And** it should have a non-white, and non-offensive background color

**Given** a user wants to change the details of an event
**When** the user performs a gesture to edit an event
**Then** the user should be presented with a form that has the event details pre-filled into the fields
**And** there should be an affordance to save the new details
*/